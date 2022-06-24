const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../model/User');

const register = async (req, res) => {
    try{
        const {first_name, last_name, email, password} = req.body;

        if(!(email && password && first_name && last_name)){
            return res.status(400).send("All inputs are required.");
        }

        const oldUser = await User.findOne({email: email.toLowerCase()});

        if(oldUser){
            return res.status(409).send("User already exists.");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
        );

        user.token = token;

        res.status(201).json(user);

    }catch(err){
        console.log(err);
    }
}


const login = async (req, res) => {
    try{
        console.log(req.body)
        const {email, password} = req.body;

        // if(!(email && password)){
        //     return res.status(400).send("All inputs are required.");
        // }

        const user = await User.findOne({email: email.toLowerCase()});
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY
            );

            user.token = token;

            return res.status(200).json(user);
        }

        return res.status(400).send("Invalid Credentials");
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    register,
    login
}