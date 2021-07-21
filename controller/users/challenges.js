const Challenge = require('../../models/challenge')
const User = require('../../models/user')
const moment = require('moment');
const admin = require('../../models/admin');
const m = moment();
const schedule = require('node-schedule');

const mongoose = require('mongoose');

schedule.scheduleJob('1 * * * * *', function () {
    Challenge.find((err, data) => {
        if (err) throw err;
        data.forEach((challenge, index) => {
            if (challenge.startstatus === 'coming' && new Date(challenge.starttime).getTime() <= new Date().getTime()) {

                Challenge.updateOne({ _id: challenge._id }, { $set: { startstatus: 'started' } }, (err) => {
                    if (err) throw err;

                    User.updateMany({ "challenges.cid": challenge._id }, {
                        '$set': {
                            'challenges.$.cstatus': 1
                        }
                    }, function (err) { if (err) throw err });
                    console.log('StartStatus started Successfully Updated');
                })
            }

            if (challenge.startstatus === 'started' && new Date(challenge.expiretime).getTime() <= new Date().getTime()) {

                Challenge.updateOne({ _id: challenge._id }, { $set: { startstatus: 'expired' } }, (err) => {
                    if (err) throw err;
                })

                User.updateMany({ "challenges.cid": challenge._id }, {
                    '$set': {
                        'challenges.$.cstatus': 2
                    }
                }, function (err) {
                    if (err) throw err;

                    // It will contain all User All Winner User Id of challenege
                    var winnersId = [];

                    User.find({ "challenges.cid": challenge._id }, ['challenges'], (err, users) => {
                        if (err) throw err;

                        users.forEach(user => {
                            user.challenges.forEach(chall => {
                                if (String(chall.cid) === String(challenge._id) && chall.cstep >= parseInt(challenge.goal)) {
                                    winnersId.push(String(user._id))
                                }
                            })
                        })

                        // Checking that Is any user win the Challenge or Not
                        if (winnersId.length) {

                            // Challenge winning ammount for each person
                            var winningAmmountForEach = (challenge.joined.length < 2) ? challenge.entryfee : ((challenge.joined.length * challenge.entryfee) - ((challenge.joined.length * challenge.entryfee) * 5 / 100)) / winnersId.length

                            // Winning Object
                            const moneyWin = {
                                date: moment().format(),
                                for: `Added ${winningAmmountForEach} Real Coin for winning ${challenge.name} challenge`,
                                reason: 'win_money',
                                coin: winningAmmountForEach
                            };

                            // Adding Winning ammount to all Winning users
                            User.updateMany({ _id: { $in: winnersId } }, { $push: { realcoin: moneyWin } }, (err) => {
                                if (err) throw err;
                                console.log('winnig Ammount Added Successfully');
                            })
                        }
                    })
                    console.log('StartStatus expired Successfully Updated');
                });
            }
        });
    })
});






module.exports = {
    getAllChallenges: (req, res) => {

        Challenge.find({ startstatus: 'coming' }, (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }

            const chall = [];
            result.forEach(challenge => {
                const obj = {};
                obj._id = challenge._id
                obj.name = challenge.name

                const challengeStart = moment(challenge.starttime)
                const today = moment()

                const days = challengeStart.diff(today, 'days')
                const hours = challengeStart.diff(today, 'hours') - (24 * (days));
                const minutes = (challengeStart.diff(today, 'minutes') - (1440 * (days))) - (60 * hours);

                var time = "";
                if (days > 0) {
                    time += `${days} Days ${hours} Hours`;
                } else if (hours > 0) {
                    time += `${hours} Hours ${minutes} Minutes `;
                } else if (minutes > 0) {
                    time += `${minutes} Minutes `;
                }

                obj.remaining = time


                if (new Date(challenge.starttime).getTime() >= new Date().getTime()) {
                    chall.push(obj)
                }
            });


            return res.status(200).json({
                success: true,
                message: `Total ${chall.length} Challenges are here`,
                data: chall
            })
        })
    },
    challengedetails: (req, res) => {
        const { cid, uid } = req.body

        Challenge.findOne({ _id: cid }, (err, challenge) => {
            if (err) throw err;

            if (challenge.startstatus === 'coming') {
                    Challenge.findOne({ _id: cid }, (err, challenge) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                message: "err from database",
                                error: err
                            })
                        }

                        Challenge.findOne({ _id: cid, joined: { $in: [uid] } }, ['_id'], (err, exist) => {
                            // User.findOne({ email: email }, (err, users) => {

                            if (err) {
                                return res.status(502).json({
                                    success: false,
                                    status: 502,
                                    message: "err from database"
                                })
                            }

                            const chall = [];
                            const obj = {};

                            if (exist) {
                                obj.joined = true
                            } else {
                                obj.joined = false
                            }


                            obj._id = challenge._id
                            obj.name = challenge.name
                            obj.status = challenge.status
                            obj.goal = challenge.goal
                            obj.reward = challenge.reward
                            obj.about = challenge.about
                            obj.entryfee = challenge.entryfee

                            const challengeStart = moment(challenge.starttime)
                            const challengeExpire = moment(challenge.expiretime)

                            const days = challengeExpire.diff(challengeStart, 'days')
                            const hours = challengeExpire.diff(challengeStart, 'hours') - (24 * (days));
                            const minutes = (challengeExpire.diff(challengeStart, 'minutes') - (1440 * (days))) - (60 * hours);


                            var time = "";
                            if (days > 0) {
                                time += `${days} Days`;
                            } else if (hours > 0) {
                                time += `${hours} Hours ${minutes} Minutes `;
                            } else {
                                time += `${minutes} Minutes`;
                            }

                            obj.duration = time
                            chall.push(obj)


                            return res.status(200).json({
                                success: true,
                                message: `Challenges details are here`,
                                data: chall[0]
                            })
                        })
                    })
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Challenges Has been Started`
                })
            }
        })
    },
    joinchallenge: (req, res) => {
        const { uid, cid } = req.body

        Challenge.findById(cid, ['joined', 'entryfee'], (err, result) => {
            if (err) throw err
            if (result.joined.indexOf(uid) !== -1) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "You have already joined this challenge",
                    data: result.joined
                })
            } else {
                var addedRealCoin = 0;
                var spendRealCoin = 0;
                User.findById(uid, ['realcoin', 'spendrealcoin'], (err, data) => {

                    if (data.realcoin) {
                        data.realcoin.forEach(ecoin => {
                            addedRealCoin += ecoin.coin
                        });
                    }

                    if (data.spendrealcoin) {
                        data.spendrealcoin.forEach(scoin => {
                            spendRealCoin += scoin.coin
                        });
                    }

                    var currentRealCoin = addedRealCoin - spendRealCoin;

                    // Checking that enough balace to join challenge
                    if (currentRealCoin < result.entryfee) {
                        return res.status(202).json({
                            success: false,
                            status: 202,
                            message: `You have to Add Minimum ${result.entryfee - currentRealCoin} to join the challenge`,
                            add_minimum: result.entryfee - currentRealCoin,
                            // data: ''
                        })
                    }

                    const moneySpend = {
                        date: moment().format(),
                        for: `Spend ${result.entryfee} Real Coin for join challenge`,
                        reason: 'Join_challenege',
                        coin: result.entryfee
                    };

                    User.findByIdAndUpdate(uid, { $push: { spendrealcoin: moneySpend } }, (err) => {
                        if (err) throw err;

                        Challenge.findByIdAndUpdate(cid, {
                            $push: { joined: uid }
                        }, {
                            new: true
                        }).exec((err, result) => {
                            if (err) {
                                return res.status(502).json({
                                    success: false,
                                    status: 502,
                                    message: "err from database",
                                    error: err
                                })
                            }

                            const challengeStart = {
                                cid: result._id,
                                cname: result.name,
                                cgoal: result.goal,
                                cstart: result.starttime,
                                cstatus: 0,
                                cstep: 0
                            }


                            User.findByIdAndUpdate(uid, { $push: { challenges: challengeStart } }, (err, data) => {
                                if (err) throw err;
                                return res.status(200).json({
                                    success: true,
                                    status: 200,
                                    message: `Joined successfully this Challenge`,
                                    add_minimum: 0,
                                    // data: result.joined
                                })
                            })
                        })
                    })
                })
            }
        })
    },
    userChallenges: (req, res) => {
        const { uid } = req.body

        User.findById(uid, ['challenges'], (err, result) => {
            if (err) throw err;
            return res.status(200).json({
                success: true,
                status: 200,
                message: `User All Challenges Update`,
                challenges: result.challenges
            })
        })
    },
    challengeRanking: (req, res) => {
        const { cid } = req.body

        User.find({ "challenges.cid": mongoose.Types.ObjectId(`${cid}`) }, ['username', 'photos', 'challenges'], (err, data) => {

            const ranking = [];
            data.forEach(user => {
                user.challenges.forEach(challenge => {

                    if (String(challenge.cid) === cid) {
                        const pushObj = {
                            _id: user._id,
                            photo: user.photos,
                            username: user.username,
                            step: challenge.cstep
                        }
                        ranking.push(pushObj)
                    }
                });
            });

            const sortedArray = ranking.sort((a, b) => b.step - a.step);
            return res.status(200).json({
                success: true,
                status: 200,
                message: `User All Challenges Update`,
                ranking: sortedArray
            })


        })
    },
}
