const express = require('express');
const { getAllUsers, getOneUser, deleteUser, createUser } = require('../controllers/user');
const {login, requestLoginCode, verifyLoginCode, signUpRequest, confirmSignUp, protect, restrictTo} = require('../controllers/authController');

const userRouter = express.Router();

// admin, chef, courier login
userRouter.post('/login', login);

// user login
userRouter.post('/login-request', requestLoginCode);
userRouter.post('/login-verify', verifyLoginCode);

// user sign up
userRouter.post('/signup-request', signUpRequest);
userRouter.post('/signup-confirm', confirmSignUp);

// get all users - only admin
userRouter.get('/', protect, restrictTo('admin'), getAllUsers);

// create user - only admin
userRouter.post('/', protect, restrictTo('admin'), createUser);

// get one user
userRouter.get('/:id', protect, getOneUser);

// delete
userRouter.delete('/:id', protect, restrictTo('admin'), deleteUser);

module.exports = userRouter;