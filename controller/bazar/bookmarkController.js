const User = require('../../models/user')

module.exports = {
    addbookmark: (req, res) => {
        const { id, pid } = req.body

            User.findOneAndUpdate({ _id: id } ,{ "$push": { "bookmarks": pid } },{ "new": true, "upsert": true }, (err, users) => {
                if (err) {
                    console.log(err);
                }

                if (users) {

                    User.find({ _id: users._id }, ['bookmarks'], (err, users) => {
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

                        return res.status(202).json({
                            success: true,
                            status: 200,
                            message: "bookmark added successfuly ",
                            user: users
                        })
                    })
                }
            })
    },
    removebookmark: (req, res) => {
        const { id, pid } = req.body

            User.findOneAndUpdate({ _id: id } ,{ "$pull": { "bookmarks": pid } }, (err, users) => {
                if (err) {
                    console.log(err);
                }

                if (users) {

                    User.find({ _id: users._id }, ['bookmarks'], (err, users) => {
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

                        return res.status(202).json({
                            success: true,
                            status: 200,
                            message: "bookmark added successfuly ",
                            user: users
                        })
                    })
                }
            })
    },
}