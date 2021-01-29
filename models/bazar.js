const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bazarSchema = new Schema({
    category: { type: String },
    disscountbanner: { type: String },
    itemtype: { type: String },
    companyname: { type: String },
    discount: { type: String },
    fullview: {
        productphoto: { type: String },
        companyicon: { type: String },
        companyname: { type: String },
        discounttitle: { type: String },
        discription: { type: String },
        point: [String],
        website: { type: String },
    },
    details: {
        photos: [String],
        companyname: { type: String },
        about: { type: String },
        notes: [String],
        instruction: [String],
        tc: [String],
        offerprice: { type: String },
    },
    expireAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

bazarSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model('bazar', bazarSchema)