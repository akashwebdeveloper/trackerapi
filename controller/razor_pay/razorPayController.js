require('dotenv').config()
const keyId = process.env.RAZOR_PAY_KEY_ID
const secretKey = process.env.RAZOR_PAY_SECRET

module.exports = {
    order: (req, res) => {
        const { uid, private } = req.body
        User.updateOne({_id: uid}, { $set: { private: private }},(err)=>{
            if (err) throw err;
            return res.status(201).json({
                success: true,
                message: `Now Private Account value is set to ${private}`
            })
        })    
    },
}