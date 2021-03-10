const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const challengeSchema = new Schema({
    name: { type: String },
    status: { type: String },
    goal: { type: String },
    reward: { type: String },
    starttime: { type: String },
    about: { type: String },
    started:[{type: ObjectId, ref:"User"}],
}, { timestamps: true });

module.exports = mongoose.model('challenge', challengeSchema)