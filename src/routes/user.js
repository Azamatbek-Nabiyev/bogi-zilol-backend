const express = require('express');
const { getAllUsers, getOneUser, deleteUser } = require('../controllers/user');
const {loginAdmin, requestLoginCode, verifyLoginCode, signUpRequest, confirmSignUp} = require('../controllers/authController');

const userRouter = express.Router();

// admin login
userRouter.post('/login-admin', loginAdmin);

// user login
userRouter.post('/login-request', requestLoginCode);
userRouter.post('/login-verify', verifyLoginCode);

// user sign up
userRouter.post('/signup-request', signUpRequest);
userRouter.post('/signup-confirm', confirmSignUp);

// get all users
userRouter.get('/', getAllUsers);

// get one user
userRouter.get('/:id', getOneUser);

// delete
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;