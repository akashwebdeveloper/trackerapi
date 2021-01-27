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
    bazar: (req, res, next) => {
        const { category, itemtype, companyname, discount, discounttitle, discription, about, notes, instruction, tc, offerprice, pa, pb, pc, pd, ed } = req.body

        var element = []
        for (let i = 0; i < req.files.photos.length; i++) {
            element.push(`http://3.140.194.252/${req.files.photos[i].path}`)
        }


        const bazar = new Bazar({
            category: category || "",
            disscountbanner: `http://3.140.194.252/${req.files.disscountbanner[0].path}` || "",
            itemtype: itemtype || "",
            companyname: companyname || "",
            discount: discount || "",
            fullview: {
                productphoto: `http://3.140.194.252/${req.files.productphoto[0].path}` || "",
                companyicon: `http://3.140.194.252/${req.files.companyicon[0].path}` || "",
                companyname: companyname || "",
                discounttitle: discounttitle || "",
                discription: discription || "",
                point: [pa, pb, pc, pd, ed] || "",
            },
            details: {
                photos: element,
                companyname: companyname || "",
                about: about || "",
                notes: notes || "",
                instruction: instruction || "",
                tc: tc || "",
                offerprice: offerprice || "",
            }
        })
        // New User Save to database
        bazar.save().then(user => {
            // login
            return res.status(200).json({
                success: 1,
                status: 200,
                message: "verfied data save in to database",
                user: [user],
            })
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
        const { id, category, itemtype, companyname, discount, discounttitle, discription, about, notes, instruction, tc, offerprice, pa, pb, pc, pd, ed } = req.body


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


            var element = []
            for (let i = 0; i < req.files.photos.length; i++) {
                element.push(`http://3.140.194.252/${req.files.photos[i].path}`)
            }


            const bazar = new Bazar({
                category: category || "",
                disscountbanner: `http://3.140.194.252/${req.files.disscountbanner[0].path}` || "",
                itemtype: itemtype || "",
                companyname: companyname || "",
                discount: discount || "",
                fullview: {
                    productphoto: `http://3.140.194.252/${req.files.productphoto[0].path}` || "",
                    companyicon: `http://3.140.194.252/${req.files.companyicon[0].path}` || "",
                    companyname: companyname || "",
                    discounttitle: discounttitle || "",
                    discription: discription || "",
                    point: [pa, pb, pc, pd, ed] || "",
                },
                details: {
                    photos: element,
                    companyname: companyname || "",
                    about: about || "",
                    notes: notes || "",
                    instruction: instruction || "",
                    tc: tc || "",
                    offerprice: offerprice || "",
                }
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
                
                // Deleting file
                var pp = items.fullview.productphoto.substr(('http://3.140.194.252/').length, items.fullview.productphoto.length);
                var ci = items.fullview.companyicon.substr(('http://3.140.194.252/').length, items.fullview.companyicon.length);
                var db = items.disscountbanner.substr(('http://3.140.194.252/').length, items.disscountbanner.length);


                for (let i = 0; i < items.details.photos.length; i++) {
                    fs.unlink(items.details.photos[i].substr(('http://3.140.194.252/').length, items.details.photos[i].length), function (err) {
                        if (err) throw err;
                        console.log(`${i + 1} deleted successfully`);
                    })
                }
                if (fs.existsSync(pp && ci && db)) {
                    fs.unlink(pp, function (err) {
                        if (err) throw err;
                        console.log('file deleted successfully');
                    })
                    fs.unlink(ci, function (err) {
                        if (err) throw err;
                        console.log('file deleted successfully');
                    })
                    fs.unlink(db, function (err) {
                        if (err) throw err;
                        console.log('file deleted successfully');
                    })
                } else {
                    console.log("File does not exist.")
                }


                if (items) {
                    Bazar.find({ _id: items._id }, (err, items) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                status: 502,
                                message: "err from database"
                            })
                        }

                        // Returning json data
                        return res.status(202).json({
                            success: true,
                            status: 200,
                            message: "User updated successfuly ",
                            item: items
                        })
                    })
                }
            })
        })
    },
    deletebazar: (req, res) => {
        Bazar.findOneAndRemove({ _id: req.body.id }, function (err, items) {
            if (err) throw err

            // Deleting file
            var pp = items.fullview.productphoto.substr(('http://3.140.194.252/').length, items.fullview.productphoto.length);
            var ci = items.fullview.companyicon.substr(('http://3.140.194.252/').length, items.fullview.companyicon.length);
            var db = items.disscountbanner.substr(('http://3.140.194.252/').length, items.disscountbanner.length);

            for (let i = 0; i < items.details.photos.length; i++) {
                fs.unlink(items.details.photos[i].substr(('http://3.140.194.252/').length, items.details.photos[i].length), function (err) {
                    if (err) throw err;
                    console.log(`${i + 1} deleted successfully`);
                })
            }
            if (fs.existsSync(pp && ci && db)) {
                fs.unlink(pp, function (err) {
                    if (err) throw err;
                    console.log('file deleted successfully');
                })
                fs.unlink(ci, function (err) {
                    if (err) throw err;
                    console.log('file deleted successfully');
                })
                fs.unlink(db, function (err) {
                    if (err) throw err;
                    console.log('file deleted successfully');
                })

                // Returning json data
                return res.status(202).json({
                    success: true,
                    status: 200,
                    message: "User deleted successfuly ",
                    item: items
                })
            } else {
                console.log("File does not exist.")
            }
        })
    }
}