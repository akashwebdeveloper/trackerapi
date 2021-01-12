const mongoose = require('mongoose')

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
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema)