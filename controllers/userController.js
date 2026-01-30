const users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register user 

exports.registerController = async (req,res)=>{
    console.log("inside registerController");
    const {username,email,password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(409).json("user already exist!!.. please login")
            
        }else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
               username,email,password:encryptedPassword
            })
            res.status(200).json(newUser)
        }
        
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
    
}

// login

exports.loginController = async (req,res)=>{
    console.log("inside loginController");
    const {email,password} = req.body
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            let isPasswordMatch = await bcrypt.compare(password,existingUser.password)
            if (isPasswordMatch) {
                const token = jwt.sign({email,role:existingUser.role},process.env.JWT_SECRET_KEY)
                res.status(200).json({user:existingUser,token})
                
            }else{
                res.status(409).json("invalid email/password")
            }
            
        }else{
            res.status(409).json("invalid email..please register to access cookpedia")
        }
     
        
    } catch(error){
        console.log(error);
        res.status(500).json(error)   
    }
    
}

// edit user profile

exports.editUserPictureController = async (req,res)=>{
    console.log("inside editUserPictureController");
    const picture = req.file
    const email = req.payload
    try {
        const existingUser = await users.findOne({email})
        existingUser.picture = picture.filename
        await existingUser.save()
        res.status(200).json(existingUser) 
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
    
}

// get all user 

exports.getAllUsersController = async (req,res)=>{
    console.log("inside getAllUsersController");
    try {
        const AllUsers = await users.find({role:{$eq:"user"}})
       
            res.status(200).json(AllUsers)
        
    } catch(error){
        console.log(error);
        res.status(500).json(error)
        
        
    }
    
}



