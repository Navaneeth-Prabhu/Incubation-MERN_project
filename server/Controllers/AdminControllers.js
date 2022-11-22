const Admin = require("../models/AdminModels");
const User = require("../models/UserModels")
const Application = require("../models/ApplicationModels")
const jwt = require("jsonwebtoken");
const userScheema = require("../models/UserModels");
const slotSchema = require("../models/SlotModels")
const { application } = require("express");
const {ObjectId} = require("mongoose").Types;

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

module.exports.Adminlogin = async(req,res,next)=> {
    try {
        const {email,password}=req.body;
        const admin = await Admin.findOne({email});
        // console.log("..................",admin);
        const token = createToken(admin._id);
        // console.log(token);

        res.cookie("jwt",token,{
            withCrdentials:true,
            httpOnly:false,
            message:maxAge * 1000,
        })
        res.status(200).json({admin:admin._id,created:true})
    } catch (err) {

        console.log(err.message);
        const errors = handleErrors(err)
        res.json({errors,created:false})
    }
};

module.exports.DashboardData = async(req,res)=>{

    try {
        
        const data = await Application.find({})
        // console.log("............asdfasdf",data)
        res.json(data)
    }catch(err){
        console.log(err);
    }
}

module.exports.PendingStatus = async(req,res)=>{
    try{
        const {id}=req.body
        console.log(id);
        await Application.findByIdAndUpdate({_id:id},{isApproved:'pending'})
            res.json({status:true})
    }catch(err){
        console.log(err);
    }
}
module.exports.ApproveStatus = async(req,res)=>{
    try{
        let id=req.params.id
        console.log(req.params.id);
        await Application.findByIdAndUpdate({_id:ObjectId(id)},{isApproved:true})
            res.json({status:true})
    }catch(err){
        console.log(err);
    }
}


module.exports.UserData = async(req,res)=>{

    try {
        const data = await userScheema.find({})
        res.json(data)
    }catch(err){
        console.log(err);
    }
}

module.exports.GetSlot = async(req,res)=>{
    try{
        const slot = await slotSchema.find({})
        // console.log(slot);
        res.json(slot)
    }catch(err){
        console.log(err);
    }
}

module.exports.ApprovedCompany = async(req,res)=>{
    try {
        const Approved = await Application.find({isAllotted:true})
        // console.log("000000000000000000000",Approved);
        res.json(Approved)
    } catch (error) {
        console.log(error);
    }
}

module.exports.bookSlot = async(req,res)=>{
    try {
        console.log(req.body)
        const {slotName,company,position, isAllotted} = req.body;
        console.log(slotName,company,position,isAllotted);
        const slotBooked = await slotSchema.updateOne({},{$set:{[`${slotName}.${position}.company`]:company,[`${slotName}.${position}.isAllotted`]:isAllotted}})
        res.json({status:true})
      } catch (error) {
        res.status(error.status).json(error.message)
      }
}


module.exports.blockUser = async(req,res)=>{
    try{
        console.log("...",req.body);
        const {id} = req.body
        // console.log("asdfasdf",id);
       const user=await userScheema.findByIdAndUpdate({_id:ObjectId(id)},{$set:{block:true}})
       console.log("fsasdfasdf",user);
        res.json(user)
        // const {_id,block}= req.body;
        // console.log("......",data._id,data.block);
    }catch(err){
console.log(err);
    }
}
module.exports.unblockUser = async(req,res)=>{
    try{
        console.log("...",req.body);
        const {id} = req.body
        // console.log("asdfasdf",id);
       const user=await userScheema.findByIdAndUpdate({_id:ObjectId(id)},{$set:{block:false}})
       console.log("fsasdfasdf",user);
        res.json(user)
        // const {_id,block}= req.body;
        // console.log("......",data._id,data.block);
    }catch(err){
console.log(err);
    }
}