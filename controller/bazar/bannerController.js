const Bazar = require('../../models/bazar')
const User = require('../../models/user')
const moment = require('moment');
const multer = require('multer');
fs = require('fs')

module.exports = {
    free: (req, res) => {
        const { userid } = req.body

        Bazar.find({ category: "Free" }, ['category', 'disscountbanner', 'companyname', 'bookmarks', 'itemtype'], (err, datas) => {


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
                    message: "No data in this Category",
                    data: [],
                })
            }



            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "App Exclusive" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {

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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Accessories" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Apparel" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Electronics" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Food & Beverage" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Footwear" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }


            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Health & Wellness" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Jewellery" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }


            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Personal Care" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Sleep Solution" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }


            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Subscription" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {

                if (result.bookmarks.indexOf(userid) !== -1) {

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
        Bazar.find({ category: "Others" }, ['category', 'itemtype', 'disscountbanner', 'bookmarks', 'companyname'], (err, datas) => {
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
                    message: "No data in this Category",
                    data: []
                })
            }

            datas.forEach((result, index) => {
                if (result.bookmarks.indexOf(userid) !== -1) {

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
    couponcode: (req, res) => {
        const { uid, bid } = req.body
        Bazar.findById(bid, ['redeemcoupon', 'couponcode', 'details'], (err, result) => {
            console.log(result);
            
            if (err) throw err

                var earnedCoin = 0;
                var spendCoin = 0;
                User.findById(uid, ['earnedcoin', 'spendcoin'], (err, data) => {

                    if (data.realcoin) {
                        data.realcoin.forEach(ecoin => {
                            earnedCoin += ecoin.coin
                        });
                    }

                    if (data.spendcoin) {
                        data.spendcoin.forEach(scoin => {
                            spendCoin += scoin.coin
                        });
                    }

                    var currentCoin = earnedCoin - spendCoin;

                    // Checking that enough balace to join challenge
                    if (currentCoin < result.entryfee) {
                        return res.status(202).json({
                            success: false,
                            status: 202,
                            message: `You have to earned Minimum ${parseInt(result.details.offerprice) - currentCoin} to Redeem the coupon`,
                            data: ''
                        })
                    }

                    const moneySpend = {
                        date: moment().format(),
                        for: `Spend ${result.details.offerprice} Coin for Redeem coupon`,
                        reason: 'redeem_coupon',
                        coin: parseInt(result.details.offerprice)
                    };

                    User.findByIdAndUpdate(uid, { $push: { spendcoin: moneySpend } }, (err) => {
                        if (err) throw err;

                        Bazar.findByIdAndUpdate(bid, {
                            $push: { redeemcoupon: uid }
                        }, {
                            new: true
                        }).exec((err, result) => {
                            if (err) throw err;
                            return res.status(200).json({
                                success: true,
                                status: 200,
                                message: `coupon code`,
                                data: result.couponcode
                            })
                        })
                    })
                })
        })
    }
}