const Bazar = require('../../models/bazar')
module.exports = {
    addbookmark: (req, res) => {
        const { id, pid } = req.body

        Bazar.findById(pid,['bookmarks'], (err, result) =>{
            if (err) throw err
            if(result.bookmarks.indexOf(id) !== -1){
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "You have already bookmarked this product",
                    data: result.bookmarks
                })
            } else{
                Bazar.findByIdAndUpdate(pid,{
                    $push:{bookmarks: id}
                },{
                    new:true
                }).exec((err,result)=>{
                    if(err){
                        return res.status(502).json({
                            success: false,
                            status: 502,
                            message: "err from database",
                            error: err
                        })
                    }else{
                        return res.status(200).json({
                            success: true,
                            status: 200,
                            message: `bookmarked successfully this product`,
                            data: result.bookmarks
                        })
                    }
                })
            }
        })
    },
    removebookmark: (req, res) => {
        const { id, pid } = req.body

        Bazar.findByIdAndUpdate(pid,{
            $pull:{bookmarks: id}
        },{
            new:true
        }).exec((err,result)=>{
            if(err){
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database",
                    error: err
                })
            }else{
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `remove bookmarked successfully this product`,
                    data: result.bookmarks
                })
            }
        })
    },
    bookmarklist: (req, res) => {
        const { id } = req.body
        Bazar.find({bookmarks: { $in: [ id ] } }, ['itemtype', 'disscountbanner', 'companyname'], (err, datas) => {
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
                    message: "not bookmarked any product"
                })
            }

            
            return res.status(200).json({
                success: true,
                status: 200,
                message: `bookmarked products are here`,
                data: datas
            })
        })
    },
}