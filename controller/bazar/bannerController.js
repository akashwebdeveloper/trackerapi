const Bazar = require('../../models/bazar')
const multer = require('multer');
fs = require('fs')

module.exports = {
    free: (req, res) => {
        const { userid } = req.body
        
        Bazar.find({category: "Free" },['category', 'disscountbanner', 'companyname', 'bookmarks', 'itemtype'], (err, datas) => {


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



                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });
                
                
                

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in free`,
                    data: datas, 
                })
                
            })
    },
    appexclusive: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "App Exclusive" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {

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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });
                

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in App Exclusive`,
                    data: datas
                })
                
            })
    },
    accessories: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Accessories" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Accessories`,
                    data: datas
                })
                
            })
    },
    apparel: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Apparel" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Apparel`,
                    data: datas
                })
                
            })
    },
    electronics: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Electronics" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Electronics`,
                    data: datas
                })
                
            })
    },
    food_beverage: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Food & Beverage" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Food & Beverage`,
                    data: datas
                })
                
            })
    },
    footwear: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Footwear" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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


                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Footwear`,
                    data: datas
                })
                
            })
    },
    health_wellness: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Health & Wellness" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Health & Wellness`,
                    data: datas
                })
                
            })
    },
    jewellery: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Jewellery" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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


                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });



                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Jewellery`,
                    data: datas
                })
                
            })
    },
    personalcare: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Personal Care" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Personal Care`,
                    data: datas
                })
                
            })
    },
    sleepsolution: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Sleep Solution" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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


                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Sleep Solution`,
                    data: datas
                })
                
            })
    },
    subscription: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Subscription" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });


                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Subscription`,
                    data: datas
                })
                
            })
    },
    others: (req, res) => {
        const { userid } = req.body
        Bazar.find({category: "Others" },['category','itemtype', 'disscountbanner','bookmarks', 'companyname'], (err, datas) => {
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

                datas.forEach((result, index) => {
                    console.log(result);
                    if(result.bookmarks.indexOf(userid) !== -1){

                        datas[index].bookmark = true
                    } else {
                        datas[index].bookmark = false
                    }
                });
                

                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `data available in Others`,
                    data: datas
                })
            })
    },
}