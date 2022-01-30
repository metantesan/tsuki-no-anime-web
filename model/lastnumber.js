const mongoose = require('mongoose');
var user = mongoose.Schema(
    {
        num:{
            type:Number,
            required:true
        }
    }
)
module.exports= mongoose.model("User", user);