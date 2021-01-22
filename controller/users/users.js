
const User = require('../../models/user')


module.exports = {
    getdata: (req, res) => {
        const { id } = req.body

        if (id.substr(id.length - 3) == 'com') {
            var EMAIL = req.body.id
        }else if (id.substr(id.length - 2) == 'in') {
            var EMAIL = req.body.id
        }else {
            var ID = req.body.id
        }
        User.find({ $or: [{ _id: ID }, { email: EMAIL }] }, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users[0]) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user doesn't exist"
                })
            }
            return res.status(200).json({
                success: true,
                status: 200,
                message: "user data Available",
                user: users
            })
        })
    },
    update: (req, res) => {
        const { id } = req.body

        if (id.substr(id.length - 3) == 'com') {
            var EMAIL = req.body.id
        }else if (id.substr(id.length - 2) == 'in') {
            var EMAIL = req.body.id
        }else {
            var ID = req.body.id
        }
        console.log(ID);
        
        User.findOneAndUpdate({ $or: [{ _id: ID }, { email: EMAIL }] }, (err, users) => {
            if (err) {
                console.log(err);
                
            }

            if (users) {
                console.log(users);
                
                // return res.status(202).json({
                //     success: false,
                //     status: 202,
                //     message: "user doesn't exist"
                // })
            }
            // return res.status(200).json({
            //     success: true,
            //     status: 200,
            //     message: "user data Available",
            //     user: users
            // })
        })
    },
}