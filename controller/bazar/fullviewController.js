const Bazar = require('../../models/bazar')
const fs = require('fs')



module.exports = {
    productfullview: (req, res) => {
        const { pid, userid } = req.body

        Bazar.findById({ _id: pid }, ['category', 'fullview'], (err, data) => {
            // User.findOne({ email: email }, (err, users) => {

            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!data) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "No data in this Category"
                })
            }

            if (data.fullview.like == 0) {
                if (data.fullview.likes.indexOf(userid) !== -1) {

                    data.fullview.like = 1
                } else {
                    data.fullview.like = 2
                }
            }



            return res.status(200).json({
                success: true,
                status: 200,
                message: `data available in ${data.category}`,
                data: data.fullview
            })

        })
    },
    details: (req, res) => {
        const { pid } = req.body

        Bazar.findById({ _id: pid }, ['category', 'details'], (err, data) => {
            // User.findOne({ email: email }, (err, users) => {

            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!data) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "No data in this Category"
                })
            }


            return res.status(200).json({
                success: true,
                status: 200,
                message: `data available in ${data.category}`,
                data: data.details
            })
        })
    }
}