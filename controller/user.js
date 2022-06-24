const User = require('../model/User');

const getUsers = async (req, res) =>{
    try{
        const users = await User.find();
        return res.status(200).json({users});
    }catch(err){
        res.status(500).json({error: err})
    }
}

const getUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        return res.status(200).json({user});
    }catch(err){
        res.status(500).json({error: err})
    }
}
const updateUser = async (req, res) =>{

    try{
        const { id } = req.params;
        const {first_name, last_name, email} = req.body;
        
        // const oldUser = await User.findOne({email});
        
        // if(oldUser){
        //     return res.status(401).json({message: "Email already used!"})
        // }
        const user = await User.findByIdAndUpdate(id, {
            first_name,
            last_name,
            email: email.toLowerCase()
        });
        return res.status(200).json({user});
    }catch(err){
        res.status(500).json({error: err})
    }
}
const deleteUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json({user});
    }catch(err){
        res.status(500).json({error: err})
    }
}

module.exports ={
    getUser,
    getUsers,
    updateUser,
    deleteUser
}