const express = require('express');
const { getAllUsers, getOneUser } = require('../controllers/user');

const userRouter = express.Router();

// get all users
userRouter.get('/', getAllUsers);

// get one user
userRouter.get('/:id', getOneUser);

module.exports = userRouter;