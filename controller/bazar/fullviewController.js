const Bazar = require('../../models/bazar')
const fs = require('fs')



module.exports = {
    productfullview: (req, res) => {
        const { id } = req.body

        Bazar.find({ _id: id }, ['category', 'fullview', 'companyname', 'details.offerprice'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {

            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!datas) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "No data in this Category"
                })
            }

            
            return res.status(200).json({
                success: true,
                status: 200,
                message: `data available in ${datas[0].category}`,
                data: {
                    point: datas[0].fullview.point,
                    productphoto: datas[0].fullview.productphoto,
                    companyicon: datas[0].fullview.companyicon,
                    companyname: datas[0].fullview.companyname,
                    discounttitle: datas[0].fullview.discounttitle,
                    discription: datas[0].fullview.discription,
                    website: datas[0].fullview.website,
                    offerprice: datas[0].details.offerprice
                }
            })

        })
    },
}