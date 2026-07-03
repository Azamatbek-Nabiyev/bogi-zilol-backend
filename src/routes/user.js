const express = require('express');
const { getAllUsers, getOneUser, deleteUser } = require('../controllers/user');

const userRouter = express.Router();

// get all users
userRouter.get('/', getAllUsers);

// get one user
userRouter.get('/:id', getOneUser);

// delete
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;