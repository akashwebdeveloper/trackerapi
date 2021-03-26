const User = require('../../models/user')
const moment = require('moment');
const m = moment();
const todayDate = m.format()
const Activity = require('../../models/activity')
// const todayDate = '2021.03.01'

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
}
