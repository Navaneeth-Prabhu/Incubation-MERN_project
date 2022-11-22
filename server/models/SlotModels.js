const mongoose = require("mongoose")

const slotSchema = new mongoose.Schema({
    A:{
        type:Array
    },
    B:{
        type:Array
    },
    C:{
        type:Array
    },
    D:{
        type:Array
    },
    E:{
        type:Array
    },
    F:{
        type:Array
    },
    G:{
        type:Array
    },
    H:{
        type:Array
    }

});



module.exports = mongoose.model("slots",slotSchema)