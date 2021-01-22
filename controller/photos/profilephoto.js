const User = require('../../models/user')
const multer = require('multer');
const { findById } = require('../../models/user');
fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profilephoto');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname);
    }
});

const upload = multer({
    storage: storage,
});


module.exports = {
    updatephoto: (req, res, next) => {

        const { id } = req.body

        if (id.substr(id.length - 3) == 'com') {
            var EMAIL = req.body.id
        } else if (id.substr(id.length - 2) == 'in') {
            var EMAIL = req.body.id
        } else {
            var ID = req.body.id
        }

        User.findOneAndUpdate({ $or: [{ _id: ID }, { email: EMAIL }] }, { $set: { photos: req.file.path || "" } }, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "err from database",
                    error: err
                });
            }

            if (!result) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user not available with this id"
                });
            } else {
                // Deleting file
                if (fs.existsSync(result.photos)) {
                    fs.unlink(result.photos, function (err) {
                        if (err) console.log(err);
                        console.log('file deleted successfully');
                    })
                } else {
                    console.log("File does not exist.")
                }


                User.findById(result._id, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // returning successfully after updating photo
                        return res.status(200).json({
                            success: true,
                            status: 200,
                            message: "Created product successfully",
                            photourl: `http://3.140.194.252/${docs.photos}`
                        });
                    }
                })
            }

        });
    },
    upload
}