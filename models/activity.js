const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const activitySchema = new Schema({
    for: {type: String},
    achivement: { type: String },
    reaction: [],
    photo: { type: String },
    username: { type: String },
    userid:{type: ObjectId, ref:"User"},
}, { timestamps: true });

module.exports = mongoose.model('activity', activitySchema)