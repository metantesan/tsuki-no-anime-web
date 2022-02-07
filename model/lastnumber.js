const mongoose = require('mongoose');
var num = mongoose.Schema(
    {
        num:{
            type:Number,
            required:true
        }
    }
)
module.exports= mongoose.model("num", num);