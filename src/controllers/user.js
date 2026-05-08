const User = require("../models/user/user");

// get all
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            total: users.length,
            data: users
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

// get one
const getOneUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch(err){

        res.status(500).json({
           message: err.message 
        })
    }
}

module.exports = {getAllUsers, getOneUser}