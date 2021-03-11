const  mongoose = require('mongoose');
const { Schema } = mongoose;

const msg = new Schema({
    msg: String,
    date: Date
})

const model = mongoose.model("msg", msg, "msg")
module.exports = model;
