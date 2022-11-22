const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const adminSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },

    
});

const Admin =  mongoose.model("Admin",adminSchema)
module.exports = Admin