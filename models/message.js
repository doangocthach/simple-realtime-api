import mongoose from 'mongoose';
const { Schema } = mongoose;

const message = new Schema({
    sender: String,
    receiver: String,
    msg: String,
    date: Date
})

module.exports =  mongoose.model("message", message, "message");
