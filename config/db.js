const mongoose = require("mongoose");
var conn;
module.exports.connect = async () => {

        try {
                console.time('db')
                conn = await mongoose.connect('mongodb://127.0.0.1:27017/tsuki')
                console.timeEnd("db")
                console.log("connectdb");
        }
        catch (err) {
                console.log("err");
        };


};
module.exports.conn = conn