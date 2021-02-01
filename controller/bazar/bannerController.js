const Bazar = require('../../models/bazar')
const multer = require('multer');
fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './bazarphoto');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname);
    }
});

const upload = multer({
    storage: storage,
}).fields([{
    name: 'disscountbanner', maxCount: 1
}, {
    name: 'productphoto', maxCount: 1
}, {
    name: 'companyicon', maxCount: 1
}, {
    name: 'photos', maxCount: 5
}])



module.exports = {
    free: (req, res) => {
        
        Bazar.find({category: "Free" },['category', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in ${datas[0].category}`,
                    data: datas
                })
                
            })
    },
    appexclusive: (req, res) => {
        Bazar.find({category: "App Exclusive" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in App Exclusive`,
                    data: datas
                })
                
            })
    },
    accessories: (req, res) => {
        Bazar.find({category: "Accessories" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Accessories`,
                    data: datas
                })
                
            })
    },
    apparel: (req, res) => {
        Bazar.find({category: "Apparel" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Apparel`,
                    data: datas
                })
                
            })
    },
    electronics: (req, res) => {
        Bazar.find({category: "Electronics" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Electronics`,
                    data: datas
                })
                
            })
    },
    food_beverage: (req, res) => {
        Bazar.find({category: "Food & Beverage" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Food & Beverage`,
                    data: datas
                })
                
            })
    },
    footwear: (req, res) => {
        Bazar.find({category: "Footwear" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Footwear`,
                    data: datas
                })
                
            })
    },
    health_wellness: (req, res) => {
        Bazar.find({category: "Health & Wellness" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Health & Wellness`,
                    data: datas
                })
                
            })
    },
    jewellery: (req, res) => {
        Bazar.find({category: "Jewellery" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Jewellery`,
                    data: datas
                })
                
            })
    },
    personalcare: (req, res) => {
        Bazar.find({category: "Personal Care" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Personal Care`,
                    data: datas
                })
                
            })
    },
    sleepsolution: (req, res) => {
        Bazar.find({category: "Sleep Solution" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Sleep Solution`,
                    data: datas
                })
                
            })
    },
    subscription: (req, res) => {
        Bazar.find({category: "Subscription" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Subscription`,
                    data: datas
                })
                
            })
    },
    others: (req, res) => {
        Bazar.find({category: "Others" },['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Others`,
                    data: datas
                })
                
            })
    },
}