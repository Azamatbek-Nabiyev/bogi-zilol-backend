const crypto = require('crypto');
const { sendLoginCode } = require('../utils/telegramBot');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { User, PendingSignUp } = require('../models');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
};

const login = catchAsync(async(req, res, next) => {
    const { phone, password } = req.body;

    // 1) check if phone and password exist
    if(!phone || !password){
        return next(new AppError('Please provide phone and password', 400))
    }

    // 2) check if user exists && password is correct
    const user = await User.findOne({phone}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect phone or password', 401));
    }

    // 3) check if user is admin
     const allowedRoles = ['admin', 'chef', 'courier'];
    if (!allowedRoles.includes(user.role)) {
        return next(new AppError('Access denied.', 403));
    }

    // 4) if everything ok, send token to admin
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });
});

const signUpRequest = catchAsync(async(req,res,next) => {
    const { firstname, lastname, phone } = req.body;

    if(!firstname || !lastname || !phone){
        return next(new AppError('Please provide all fields', 400))
    }

    const existingUser = await User.findOne({phone});

    if(existingUser){
        return next(new AppError('This user already registered, please log in!', 400));
    }

    await PendingSignUp.deleteMany({ phone });

    const token = crypto.randomBytes(16).toString('hex');

    await PendingSignUp.create({
        firstname, lastname, phone, token
    });

    const botUsername = process.env.TELEGRAM_BOT_USERNAME;
    const botLink = `https://t.me/${botUsername}?start=${token}`;

    res.status(200).json({
        status: 'success',
        botLink
    });
});


const confirmSignUp = catchAsync(async (req, res, next) => {
    const { token, code } = req.body;

    if(!token || !code){
        return next(new AppError('Please provide token and code', 400));
    }

    const pending = await PendingSignUp.findOne({token});

    if(!pending || !pending.code){
        return next(new AppError('Code is not send yet', 401));
    }

    if(pending.code != code || pending.codeExpiresAt < Date.now()){
        return next(new AppError('Code is wrong or expired!', 401))
    }

    const user = await User.create({
        firstname: pending.firstname,
        lastname: pending.lastname,
        phone: pending.phone,
        telegramChatId: pending.chatId,
        role: 'user'
    });

    await PendingSignUp.deleteOne({_id: pending._id});

    const jwtToken = signToken(user._id);

    res.status(201).json({
        status: 'success',
        token: jwtToken
    });
});


const requestLoginCode = catchAsync(async (req, res, next)=> {
    const {phone} = req.body;

    if(!phone){
        return next(new AppError('Please provide phone number!', 400))
    }

    const user = await User.findOne({ phone, role: 'user' }).select('+telegramChatId');

    if(!user){
        return next(new AppError('No user found with this ID', 404))
    }

    const code = Math.floor(1000+Math.random() * 9000).toString();

    user.loginCode = code;
    user.loginCodeExpires = Date.now() + 5 * 60 * 1000;
    await user.save({ validateBeforeSave: false })

    await sendLoginCode(user.telegramChatId, code);

     res.status(200).json({
        status: 'success',
        message: 'Code have been sent!'
    });
});


const verifyLoginCode = catchAsync(async (req, res, next) => {
    const {phone, code} = req.body;

    if(!phone || !code){
        return next(new AppError('Please provide phone and code!', 400))
    }

    const user = await User.findOne({phone}).select('+loginCode +loginCodeExpires');

    if(!user || user.loginCode !== code || user.loginCodeExpires < Date.now()){
        return next(new AppError('Code is wrong or expired!', 401))
    }

    user.loginCode = undefined;
    user.loginCodeExpires = undefined;
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id);res.status(200).json({
        status: 'success',
        token
    });
})

const protect = catchAsync(async (req, res, next) => {
    // 1) getting token and check if it's here
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1]        
    }
 
    if(!token){
        return next(new AppError('you are not logged in! Please log in to get access', 401));
    }

    // 2) verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if user still exists
    const currentUser = await User.findById(decoded.id);

    if(!currentUser){
        return next(new AppError('The user belonging to this token does not longer exist.', 401))
    }

    // 4) check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again!', 401))
    }

    // GRAND ACCESS TO PROTECTED ROUTE
    req.user = currentUser;

    next();
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action!', 403))
        }

        next();
    }
}

module.exports = {
    login,
    signUpRequest,
    confirmSignUp,
    requestLoginCode,
    verifyLoginCode,
    protect, 
    restrictTo
};