const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const Schema = mongoose.Schema

const userSchema = new Schema({
    type: { type: String },
    private: { type: Boolean, default: false },
    fname: { type: String },
    lname: { type: String },
    username: { type: String },
    dob: { type: String },
    status: { type: String, default: 'If you are in a bad mood, go for a walk.' },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String },
    email: { type: String, unique: false },
    photos: { type: String },
    countrycode: { type: String },
    phone: { type: String },
    token: { type: String },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    todaysteps: { type: Number, default: 0 },
    todaykm: { type: Number, default: 0 },
    calorie: { type: Number, default: 0 },
    referralcode: { type: String },
    synccontact: { type: Array },
    progress: { type:Array },
    challenges: { type:Array },
    earnedcoin: { type:Array },
    spendcoin: { type:Array },
}, { timestamps: true });


module.exports = mongoose.model('user', userSchema)