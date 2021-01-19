
const User = require('../../models/user')


module.exports = {
    getdata: (req, res) => {
        const { id, email } = req.body

        User.find({ $or: [{ _id: id }, { email: email }] }, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users[0]) {
                return res.status(201).json({
                    success: false,
                    status: 201,
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
}