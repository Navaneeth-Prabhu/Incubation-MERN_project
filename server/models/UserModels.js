const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"UserName is required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    block:{
        type:Boolean
    }

    
});

userScheema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userScheema.statics.login = async function(email,password){
    const users = await this.findOne({email});
    if(users){
        const auth = await bcrypt.compare(password, users.password);
        if(auth){
            return users;
        }
        throw Error("incorrect password")
    }
    throw Error ("incorrect email")
}


module.exports = mongoose.model("User",userScheema)