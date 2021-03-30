const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const challengeSchema = new Schema({
    name: { type: String },
    status: { type: String },
    goal: { type: String },
    reward: { type: String },
    starttime: { type: String },
    expiretime: { type: String },
    about: { type: String },
    startstatus: { type: String, default: 'coming'},
    joined:[{type: ObjectId, ref:"User"}],
    size: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('challenge', challengeSchema)