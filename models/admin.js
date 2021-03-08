const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    type: { type: String, default: 'admin' },
    fname: { type: String, default: 'Akash' },
    lname: { type: String, default: 'Patel' },
    username: { type: String, default: 'jai@gmail.com' },
    password: { type: String },
    referral: {type: Number}
}, { timestamps: true });


module.exports = mongoose.model('admin', adminSchema)