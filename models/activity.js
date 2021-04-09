const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const activitySchema = new Schema({
    activitytitle: {type: String},
    for: { type: String },
    photovalue: { type: String },
    reaction: [],
    userid:{type: ObjectId, ref:"User"},
}, { timestamps: true });

module.exports = mongoose.model('activity', activitySchema)