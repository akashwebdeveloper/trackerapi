const Bazar = require('../../models/bazar')
const multer = require('multer');
fs = require('fs')

module.exports = {
    free: (req, res) => {
        const { userid } = req.body
        
        Bazar.find({category: "Free" },['category', 'disscountbanner', 'companyname', 'bookmarks'], (err, datas) => {
            // console.log(err);
            // // User.findOne({ email: email }, (err, users) => {
            //     datas.forEach(result => {
            //         console.log(result);
            //         const bookmark;
            //         if(result.bookmarks.indexOf(userid) !== -1){
            //             console.log(result.bookmark = true);
                        
            //             return res.status(202).json({
            //                 success: false,
            //                 status: 202,
            //                 message: "You have already bookmarked this product",
            //                 data: result.bookmark = true
            //             })
            //         } else {
            //             return res.status(502).json({
            //                 success: false,
            //                 status: 502,
            //                 message: "err from database"
            //             })
            //         }
            //     });

                

                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas[0]) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "No data in this Category"
                    })
                }

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in free`,
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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
                    console.log(err);
                    
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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

                if (!datas[0]) {
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