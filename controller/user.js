const User = require('../model/User');

const getUsers = async (req, res) =>{
    res.status(200).json({
        message: "GET"
    })
}

const getUser = async (req, res) =>{
    const {id} = req.params
    res.status(200).json({
        message: "GET"
    })
}
const updateUser = async (req, res) =>{
    const {id} = req.params
    res.status(200).json({
        message: "GET"
    })
}
const deleteUser = async (req, res) =>{
    const {id} = req.params
    res.status(200).json({
        message: "GET"
    })
}

module.exports ={
    getUser,
    getUsers,
    updateUser,
    deleteUser
}