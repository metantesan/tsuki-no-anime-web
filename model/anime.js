const mongoose = require('mongoose');

var anime = mongoose.Schema(
    {
        id: Number,
        mal: {
            type: Object,
            required: true,
        },
        views: {
            type: Number,
            default: 0
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)
module.exports = mongoose.model("Anime", anime);
// var user = mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         emali:{
//             type:String,
//             required: true,
//             unique: true,
//         },
//         is_admin:{
//             type:Boolean,
//             default: false
//         },
//         create_admin:{
//             type:Boolean,
//             default: false
//         },
//         password: {
//             type: String,
//             required: true,
//             minlength: 8,
//             maxlength: 255,
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//         },
//     }
// )