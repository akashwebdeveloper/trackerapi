
const User = require('../../models/user')


module.exports = {
    getdata: (req, res) => {
        const { id, email } = req.body

        User.find({ $or: [{ _id: id }, { email: email }] }, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: "0",
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users) {
                return res.status(403).json({
                    success: "0",
                    status: 403,
                    message: "user doesn't exist"
                })
            }

            res.status(200).json({
                success: "1",
                status: 200,
                message: "user data Available",
                user: users
            })
        })
    },
}