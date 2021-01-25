const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bazarSchema = new Schema ({
    category: {type: String},
    disscountbanner: {type: String},
    itemtype: {type: String},
    companyname: {type: String},
    discount: {type: String},
    fullview: {
        productphoto: {type: String},
        companyicon: {type: String},
        companyname: {type: String},
        discounttitle: {type: String},
        discription: {type: String},
        point: [ String ],
    },
    details: {
        photos: [ String ],
        companyname: {type: String},
        about: {type: String},
        notes: [ String ],
        instruction: [ String ],
        tc: [ String ],
        offerprice: {type: String},
    },
}, { timestamps: true });


module.exports = mongoose.model('bazar', bazarSchema)