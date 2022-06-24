const Conatct = require('../model/Contact');

const getContacts = async (req, res) =>{
    res.status(200).json({
        message: "GET"
    })
}

const getContact = async (req, res) =>{
    const {id} = req.params
    res.status(200).json({
        message: "GET"
    })
}
const updateContact = async (req, res) =>{
    const {id} = req.params
    res.status(200).json({
        message: "GET"
    })
}
const deleteContact = async (req, res) =>{
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