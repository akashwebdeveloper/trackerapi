
const User = require('../../models/user')


module.exports = {
    getdata(req, res) {
        const { _id } = req.body

        User.findById( _id , (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: "0",
                    messsage: "err from database"
                })
            }

            if (!users) {
                return res.status(403).json({
                    success: "0",
                    messsage: "user doesn't exist"
                })
            }

            res.status(403).json({
                success: "0",
                messsage: "user Details are here",
                user: users
            })
        })
    },
}