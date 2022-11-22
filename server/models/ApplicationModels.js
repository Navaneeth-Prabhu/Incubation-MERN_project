const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({

    UserId:{
        type:mongoose.Types.ObjectId, 
    },
    name:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    company_and_products:{
        type:String
    },
    company_name:{
        type:String
    },
    competitive_advantage:{
        type:String
    },
    email:{
        type:String
    },
    incubation_type:{
        type:String
    },
    market_plan:{
        type:String
    },
    market_size:{
        type:String
    },
    phone:{
        type:String
    },
    problem:{
        type:String
    },
    proposal:{
        type:String
    },
    revenue_model: {
        type:String
    },
    solution:{
        type:String
    },
    state:{
        type:String
    },
    team_and_background: {
        type:String
    },
    value_proposition:{
        type:String
    },
    isApproved:{
        type:Boolean
    }

    
});



module.exports = mongoose.model("applications",applicationSchema)