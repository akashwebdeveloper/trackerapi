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
    name: 'productphoto', maxCount: 5
}, {
    //     name: 'companyicon', maxCount: 1
    // }, {
    name: 'photos', maxCount: 5
}])



module.exports = {
    getbazarform: (req, res) => {
        return res.render('form', { page_name: 'form', sub_page: 'bazarform' })
    },
    bazar: (req, res, next) => {
        const { category, itemtype, companyname, discount, discounttitle, discription, website, about, notes, instruction, tc, offerprice, pa, pb, pc, pd, ed, couponcode } = req.body


        //   for replacing slash 
        const invertSlashes = str => {
            let res = '';
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== '\\') {
                    res += str[i];
                    continue;
                };
                res += '\/';
            };
            return res;
        };


        var element = []
        for (let i = 0; i < req.files.photos.length; i++) {
            element.push(`http://13.213.4.147/${invertSlashes(req.files.photos[i].path)}`)
        }

        var element1 = []
        for (let i = 0; i < req.files.productphoto.length; i++) {
            element1.push(`http://13.213.4.147/${invertSlashes(req.files.productphoto[i].path)}`)
        }


        const bazar = new Bazar({
            category: category || "",
            disscountbanner: `http://13.213.4.147/${invertSlashes(req.files.disscountbanner[0].path)}` || "",
            itemtype: itemtype || "",
            companyname: companyname || "",
            discount: discount || "",
            fullview: {
                productphoto: element1,
                // companyicon: `http://13.213.4.147/${invertSlashes(req.files.companyicon[0].path)}` || "",
                companyname: companyname || "",
                discounttitle: discounttitle || "",
                discription: discription || "",
                point: [pa, pb, pc, pd, ed] || "",
                website: website || "",
                offerprice: offerprice || "",
            },
            details: {
                photos: element,
                companyname: companyname || "",
                about: about || "",
                notes: notes || "",
                instruction: instruction || "",
                tc: tc || "",
                offerprice: offerprice || "",
                couponcode: couponcode || ""
            },
            expireAt: ed
        })

        // bazar.index({createdAt: 1},{expireAfterSeconds: dt})
        // New User Save to database
        bazar.save().then(user => {
            // login
            return res.redirect('/admin/bazartable')
        }).catch(err => {
            return res.status(503).json({
                success: 0,
                status: 503,
                message: "err from database",
                err
            })
        })
    },
    upload,
    updatebazar: (req, res, next) => {
        const { id, category, itemtype, companyname, discount, discounttitle, discription, website, about, notes, instruction, tc, offerprice, pa, pb, pc, pd, ed } = req.body


        Bazar.find({ _id: id }, (err, items) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!items[0]) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user doesn't exist"
                })
            }


            // Deleting file
            // var ci = items[0].fullview.companyicon.substr(('http://13.213.4.147/').length, items[0].fullview.companyicon.length);
            var db = items[0].disscountbanner.substr(('http://13.213.4.147/').length, items[0].disscountbanner.length);
            var element = []
            var element1 = []
            var disb;
            if (req.files.photos) {
                for (let i = 0; i < req.files.photos.length; i++) {
                    element.push(`http://13.213.4.147/${req.files.photos[i].path}`)
                }
                for (let i = 0; i < items[0].details.photos.length; i++) {
                    fs.unlink(items[0].details.photos[i].substr(('http://13.213.4.147/').length, items[0].details.photos[i].length), function (err) {
                        if (err) throw err;
                        console.log(`${i + 1} deleted successfully`);
                    })
                }
            }

            if (req.files.productphoto) {
                for (let i = 0; i < req.files.productphoto.length; i++) {
                    element1.push(`http://13.213.4.147/${req.files.productphoto[i].path}`)
                }
                for (let i = 0; i < items[0].fullview.productphoto.length; i++) {
                    fs.unlink(items[0].fullview.productphoto[i].substr(('http://13.213.4.147/').length, items[0].fullview.productphoto[i].length), function (err) {
                        if (err) throw err;
                        console.log(`${i + 1} deleted successfully`);
                    })
                }
            }

            if (req.files.disscountbanner) {
                disb = `http://13.213.4.147/${req.files.disscountbanner[0].path}`
                if (fs.existsSync(db)) {
                    fs.unlink(db, function (err) {
                        if (err) throw err;
                        console.log('file deleted successfully');
                    })
                } else {
                    console.log("File does not exist.")
                }
            } else {
                disb = items[0].fullview.disscountbanner
            }

            // if (req.files.companyicon) {
            //     coi = `http://13.213.4.147/${req.files.companyicon[0].path}`
            //     if (fs.existsSync(ci)) {
            //         fs.unlink(ci, function (err) {
            //             if (err) throw err;
            //             console.log('file deleted successfully');
            //         })
            //     } else {
            //         console.log("File does not exist.")
            //     }
            // } else {
            //     coi = items[0].fullview.companyicon
            // }



            const bazar = new Bazar({
                category: category || "",
                disscountbanner: disb,
                itemtype: itemtype || "",
                companyname: companyname || "",
                discount: discount || "",
                fullview: {
                    productphoto: element1 || items[0].fullview.photos,
                    companyname: companyname || "",
                    discounttitle: discounttitle || "",
                    discription: discription || "",
                    point: [pa, pb, pc, pd, ed] || "",
                    website: website || "",
                    offerprice: offerprice || "",
                },
                details: {
                    photos: element || items[0].details.photos,
                    companyname: companyname || "",
                    about: about || "",
                    notes: notes || "",
                    instruction: instruction || "",
                    tc: tc || "",
                    offerprice: offerprice || "",
                },
                expireAt: ed
            })

            // Convert the Model instance to a simple object using Model's 'toObject' function
            // to prevent weirdness like infinite looping...
            var upsertData = bazar.toObject();

            // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
            delete upsertData._id;


            Bazar.findOneAndUpdate({ _id: id }, upsertData, (err, items) => {

                if (err) {
                    console.log(err);
                }

                // // Deleting file
                // var pp = items.fullview.productphoto.substr(('http://13.213.4.147/').length, items.fullview.productphoto.length);
                // var ci = items.fullview.companyicon.substr(('http://13.213.4.147/').length, items.fullview.companyicon.length);
                // var db = items.disscountbanner.substr(('http://13.213.4.147/').length, items.disscountbanner.length);


                // for (let i = 0; i < items.details.photos.length; i++) {
                //     fs.unlink(items.details.photos[i].substr(('http://13.213.4.147/').length, items.details.photos[i].length), function (err) {
                //         if (err) throw err;
                //         console.log(`${i + 1} deleted successfully`);
                //     })
                // }
                // if (fs.existsSync(pp && ci && db)) {
                //     fs.unlink(pp, function (err) {
                //         if (err) throw err;
                //         console.log('file deleted successfully');
                //     })
                //     fs.unlink(ci, function (err) {
                //         if (err) throw err;
                //         console.log('file deleted successfully');
                //     })
                //     fs.unlink(db, function (err) {
                //         if (err) throw err;
                //         console.log('file deleted successfully');
                //     })
                // } else {
                //     console.log("File does not exist.")
                // }


                if (items) {
                    Bazar.find({ _id: items._id }, (err, items) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                status: 502,
                                message: "err from database"
                            })
                        }

                        // Returning to table
                        return res.redirect('/admin/bazartable')
                    })
                }
            })
        })
    },
    deletebazar: (req, res) => {
        Bazar.findOneAndRemove({ _id: req.params.id }, function (err, items) {
            if (err) throw err

            // Deleting file
            var db = items.disscountbanner.substr(('http://13.213.4.147/').length, items.disscountbanner.length);

            for (let i = 0; i < items.details.photos.length; i++) {
                fs.unlink(items.details.photos[i].substr(('http://13.213.4.147/').length, items.details.photos[i].length), function (err) {
                    if (err) throw err;
                    console.log(`${i + 1} deleted successfully`);
                })
            }

            for (let i = 0; i < items.fullview.productphoto.length; i++) {
                fs.unlink(items.fullview.productphoto[i].substr(('http://13.213.4.147/').length, items.fullview.productphoto[i].length), function (err) {
                    if (err) throw err;
                    console.log(`${i + 1} deleted successfully`);
                })
            }

            if (fs.existsSync(db)) {
                fs.unlink(db, function (err) {
                    if (err) throw err;
                    console.log('file deleted successfully');
                })

                // Returning to table
                return res.redirect('/admin/bazartable')
            } else {
                console.log("File does not exist.")
            }
        })
    },
    bazartable: (req, res) => {
        try {
            var query = {};
            var page = 1;
            var perpage = 10;
            if (req.query.page != null) {
                page = req.query.page
            }
            query.skip = (perpage * page) - perpage;
            query.limit = perpage;
            //    getting data in limit for pagination
            Bazar.find({}, {}, query, (err, data) => {
                if (err) {
                    console.log(err);
                }
                Bazar.estimatedDocumentCount((err, count) => {
                    if (err) {
                        console.log(err)
                    }

                    return res.render('table', {
                        data: data,
                        current: page,
                        pages: Math.ceil(count / perpage),
                        page_name: 'table',
                        perpage,
                        sub_page: 'bazar',
                    })
                });
            });
        } catch (error) {
            console.log(error);
        }
    },
    updatebazarform: (req, res) => {
        Bazar.find({ _id: req.params.id }, function (err, item) {
            if (err) throw err
            return res.render('updatebazar', { page_name: 'form', sub_page: 'form',item: item[0] })
        });
    }
}