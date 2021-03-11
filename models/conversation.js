import mongoose from 'mongoose';
const { Schema } = mongoose;

const conversation = new Schema({
    msgID: String,
    msgs: [String],
    userID1: String,
    userID2: String,
    newestMsg: String,
})