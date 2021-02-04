const Bazar = require('../../models/bazar')
module.exports = {
    like: (req, res) => {
        const { id, pid } = req.body

        Bazar.findById(pid,['fullview.likes'], (err, result) =>{
            if (err) throw err
            if(result.fullview.likes.indexOf(id) !== -1){
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "You have already liked this product",
                    data: result.fullview.likes
                })
            } else{
                Bazar.findByIdAndUpdate(pid,{
                    $push: { "fullview.likes": id }
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
                            message: `liked successfully this product`,
                            data: result.fullview.likes
                        })
                    }
                })
            }
        })
    },
    unlike: (req, res) => {
        const { id, pid } = req.body

        Bazar.findByIdAndUpdate(pid,{
            $pull: { "fullview.likes": id }
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
                    message: `unlike successfully this product`,
                    data: result.fullview.likes
                })
            }
        })
    },
}