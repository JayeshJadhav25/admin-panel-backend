const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req,res) => {
    try {
        const users = await User.find({
            isAdmin:false
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

const addUser = async (req,res) => {
    try {
        const { email,password,username } = req.body;

        const isExist = await User.findOne({ email });
        if(isExist) {
            return res.status(400).json({
                message:'Email is already register'
            })
        }

        let user = new User({
            email,
            password,
            username
        })

        user.password = await bcrypt.hash(password, 8);
        await user.save();

        res.status(201).json({
            message:'New User Added Succesfully!!!'
        })
        
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}

const login = async (req,res) => {
    try {
        const { email,password } = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message:"Invalid Credential"
            })
        }

        const checkPassword = await bcrypt.compare(password,user.password)

        if(!checkPassword) {
            return res.status(400).json({
                message:"Invalid Credential"
            })
        }

        const payload = {
            user: {
                id:user.id
            }
        }

        const token = jwt.sign(payload, "adminpanel");
        res.status(200).json({
            token:token,
            user:user
        });
 
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    getUsers,
    addUser,
    login
};