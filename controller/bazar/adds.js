const Challenge = require('../../models/challenge')
const User = require('../../models/user')
const moment = require('moment');
const admin = require('../../models/admin');
const m = moment();
const schedule = require('node-schedule');

const mongoose = require('mongoose')



module.exports = {
    addsEarning: (req, res) => {
        const { uid } = req.body;

        User.findByIdAndUpdate(uid, {$inc: {earnedcoin: 1}},(err)=>{
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            return res.status(200).json({
                success: true,
                status: 200,
                message: `1 UBS Coin added Successfully for watching video`
            })
        })
    },
}
