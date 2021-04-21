const User = require('../../models/user')
const moment = require('moment');
const Admin = require('../../models/admin');

module.exports = {
    setPrivate: (req, res) => {
        const { uid, private } = req.body
        User.updateOne({_id: uid}, { $set: { private: private }},(err)=>{
            if (err) throw err;
            return res.status(201).json({
                success: true,
                message: `Now Private Account value is set to ${private}`
            })
        })    
    },
    FAQ: (req, res) => {
        
        Admin.find({},['f_a_q'],(err, data)=>{
            if (err) throw err;
            return res.status(201).json({
                success: true,
                message: `All ${data[0].f_a_q.length} Frequently Asked Questions`,
                data: data[0].f_a_q
            })
        })    
    },
}
