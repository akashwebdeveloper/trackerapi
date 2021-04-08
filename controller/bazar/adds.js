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

        User.findById(uid , ['earnedcoin'], (err, items) => {
            if (err) throw err;


            const todayEarning = { date: moment().format(), for: `Daily Reward`, reason: 1, coin: 0.50 };

            var allEarning;
            let earning = items.earnedcoin.filter(earn => (moment(earn.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) && earn.reason == 1);

            if (!items.earnedcoin.length) {
                allEarning = [];
                allEarning.push(todayEarning)

            } else if (!earning.length) {
                allEarning = items.earnedcoin;
                allEarning.push(todayEarning)

            } else {
                allEarning = items.earnedcoin;
                allEarning.forEach((element, index) => {

                    if (moment(element.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && element.reason === 1) {
                        allEarning[index].coin += 0.50
                    }
                });
            }


            User.findByIdAndUpdate(uid, { $set: {earnedcoin: allEarning }}, (err, data) => {
                if (err) throw err;
                return res.status(200).json({
                            success: true,
                            status: 200,
                            message: `1 UBS Coin added Successfully for watching video`
                        })
            })
        })

        // User.findByIdAndUpdate(uid, {$inc: {earnedcoin: 1}},(err)=>{
        //     if (err) {
        //         return res.status(502).json({
        //             success: false,
        //             status: 502,
        //             message: "err from database"
        //         })
        //     }

        //     return res.status(200).json({
        //         success: true,
        //         status: 200,
        //         message: `1 UBS Coin added Successfully for watching video`
        //     })
        // })
    },
}
