const Bazar = require('../../models/bazar')
const fs = require('fs')



module.exports = {
    productfullview: (req, res) => {
        const { id } = req.body

        Bazar.find({_id: id },['category', 'fullview', 'companyname'], (err, datas) => {
            // User.findOne({ email: email }, (err, users) => {
                console.log(datas);
                
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
                    data: datas
                })
                
            })
    },
}