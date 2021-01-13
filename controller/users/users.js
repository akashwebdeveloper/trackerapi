
const User = require('../../models/user')


module.exports = {
    getdata: (req, res) => {
        const { id, email } = req.body

        User.find({ $or: [{ _id: id }, { email: email }] }, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: "0",
                    status: 502,
                    messsage: "err from database"
                })
            }

            if (!users) {
                return res.status(403).json({
                    success: "0",
                    status: 403,
                    messsage: "user doesn't exist"
                })
            }

            res.status(200).json({
                success: "0",
                status: 200,
                messsage: "user Details are here",
                user: users
            })
        })
    },
}