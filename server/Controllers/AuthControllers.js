const User = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModels");
const { response } = require("express");

const maxAge = 1*24*60*60;
const createToken =(id)=>{
    return jwt.sign({id},"incubation",{
        expiresIn:maxAge
    })
}

const handleErrors = (err)=>{
    let errors = {email:"",password:""};

    if(err.message === "incorrect email"){
        errors.email = 'Email is not registered'
    }
    if(err.message === "incorrect password"){
        errors.email = "incorrect password"
    }

    if(err.code === 11000){
        errors.email="email is already register";
        return errors;
    }

    if(err.message.includes("Users validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]= properties.message
        })
    }
    return errors;
}

module.exports.register = async(req,res,next)=> {
    try {
        const {name,email,password}=req.body;
        const user = await User.create({name,email,password});
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCrdentials:true,
            httpOnly:false,
            message:maxAge * 1000,
        })
        res.status(201).json({user:user._id,created:true})
    } catch (err) {
        console.log(err.message);
        const errors = handleErrors(err)
        res.json({errors,created:false})
    }
};
module.exports.login = async(req,res,next)=> {

    try {
        const {email,password}=req.body;
        const user = await User.login(email,password);
        const token = createToken(user._id);

        res.cookie("jwt",token,{
            withCrdentials:true,
            httpOnly:false,
            message:maxAge * 1000,
        })
        res.status(200).json({user:user._id,created:true})
    } catch (err) {
        // console.log(err.message);
        const errors = handleErrors(err)
        res.json({errors,created:false})
    }
};

