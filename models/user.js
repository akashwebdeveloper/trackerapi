const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const userSchema = new Schema ({
    type: {type: String},
    fname: {type: String},
    lname: {type: String},
    username: {type: String},
    dob: {type: String},
    weight: {type: Number},
    height: {type: Number},
    gender: {type: String},
    email: {type: String, unique: false},
    photos: {type: String},
    countrycode: {type: String},
    phone: {type: String},
    token: {type: String},
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema)