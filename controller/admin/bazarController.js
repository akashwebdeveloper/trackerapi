const multer = require('multer');
fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = "./bazarphoto";

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, new Date + file.originalname );
    }
});

const upload = multer({
    storage: storage,
}).array('files', 12)



const Bazar = require('../../models/bazar')
module.exports = {
    bazar : (req,res, next) =>{
    //   upload(req,res,err => {
    //     if (err) {
    //         throw err
    //     }
    //   })
    //     const { category, disscountbanner, itemtype, companyname, discount, productphoto, companyicon, discounttitle, discription, photos, about, notes, instruction, tc, offerprice, pa, pb ,pc, pd, ed } = req.body

    //     console.log(category, disscountbanner, itemtype, companyname, discount, productphoto, companyicon, discounttitle, discription, photos, about, notes, instruction, tc, offerprice, pa, pb ,pc, pd, ed);
        
       
    //             const bazar = new Bazar({
    //                 category: category || "",
    //                 disscountbanner: disscountbanner || "",
    //                 itemtype: itemtype || "",
    //                 companyname: companyname || "",
    //                 discount: discount || "",
    //                 fullview: {
    //                     productphoto: productphoto || "",
    //                     companyicon: companyicon || "",
    //                     companyname: companyname || "",
    //                     discounttitle: discounttitle || "",
    //                     discription: discription || "",
    //                     point: [pa, pb ,pc, pd, ed] || "",
    //                 },
    //                 details: {
    //                     photos: photos || "",
    //                     companyname: companyname || "",
    //                     about: about || "",
    //                     notes: notes || "",
    //                     instruction: [instruction] || "",
    //                     tc: tc || "",
    //                     offerprice: offerprice || "",
    //                 }
    //             })
    //             // New User Save to database
    //             bazar.save().then(user => {
    //                 // login
    //                 return res.status(200).json({
    //                     success: 1,
    //                     status: 200,
    //                     message: "verfied data save in to database",
    //                     user: [user],
    //                 })
    //             }).catch(err => {
    //                 return res.status(503).json({
    //                     success: 0,
    //                     status: 503,
    //                     message: "err from database",
    //                     err
    //                 })
    //             })
            },
}