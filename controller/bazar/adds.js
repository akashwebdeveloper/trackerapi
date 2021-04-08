const Challenge = require('../../models/challenge')
const User = require('../../models/user')
const moment = require('moment');
const admin = require('../../models/admin');
const schedule = require('node-schedule');
const mongoose = require('mongoose')
const perAdCoin = 0.50;


module.exports = {
    addsEarning: (req, res) => {
        const { uid } = req.body;

        User.findById(uid, ['earnedcoin'], (err, items) => {
            if (err) throw err;


            const todayEarning = { date: moment().format(), for: `Daily Reward`, reason: 1, coin: perAdCoin };

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
                        allEarning[index].coin += perAdCoin
                    }
                });
            }


            User.findByIdAndUpdate(uid, { $set: { earnedcoin: allEarning } }, (err, data) => {
                if (err) throw err;
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: `1 UBS Coin added Successfully for watching video`
                })
            })
        })
    },
    adsCounter: (req, res) => {
        const { uid } = req.body;


        // Earning Reason will 1 If reason is ads
        User.findById(uid, ['earnedcoin'], (err, items) => {
            if (err) throw err;


            let earning = items.earnedcoin.filter(earn => (moment(earn.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) && earn.reason == 1);

            if (!earning.length) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    counter: 0
                })

            } else {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    counter: earning[0].coin/perAdCoin
                })
            }  
        })
    },
}
