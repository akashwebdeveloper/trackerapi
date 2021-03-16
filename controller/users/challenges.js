const Challenge = require('../../models/challenge')
const User = require('../../models/user')
const moment = require('moment');
const admin = require('../../models/admin');
const m = moment();
module.exports = {
    getAllChallenges: (req, res) => {

        Challenge.find({}, (err, result) => {
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
                } else {
                    time += `${hours} Hours ${minutes} Minutes `;
                }

                obj.remaining = time


                if (new Date(challenge.starttime).getTime() >= new Date().getTime()) {

                    chall.push(obj)
                } else {
                    Challenge.updateOne({ _id: challenge._id }, { $set: { startstatus: 'started' } }, (err) => {
                        if (err) throw err;
                        console.log('StartStatus Successfully Updated');
                    })
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

            if (new Date(challenge.starttime).getTime() >= new Date().getTime()) {

                Challenge.updateOne({ _id: challenge._id }, { $set: { startstatus: 'coming' } }, (err) => {
                    if (err) throw err;

                    Challenge.findOne({ _id: cid }, (err, challenge) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                message: "err from database",
                                error: err
                            })
                        }

                        Challenge.find({ _id: cid, joined: { $in: [uid] } }, ['_id'], (err, datas) => {
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

                            if (datas) {
                                obj.joined = true
                            }else {
                                obj.joined = false

                            }




                            obj._id = challenge._id
                            obj.name = challenge.name
                            obj.status = challenge.status
                            obj.goal = challenge.goal
                            obj.reward = challenge.reward
                            obj.about = challenge.about

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
                })
            } else {
                Challenge.updateOne({ _id: challenge._id }, { $set: { startstatus: 'started' } }, (err) => {
                    if (err) throw err;
                })
                return res.status(200).json({
                    success: true,
                    message: `Challenges Has been Started`
                })
            }
        })
    },
    joinchallenge: (req, res) => {
        const { uid, cid } = req.body

        Challenge.findById(cid, ['joined'], (err, result) => {
            if (err) throw err
            if (result.joined.indexOf(uid) !== -1) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "You have already joined this challenge",
                    data: result.joined
                })
            } else {
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
                    } else {
                        return res.status(200).json({
                            success: true,
                            status: 200,
                            message: `Joined successfully this Challenge`,
                            data: result.joined
                        })
                    }
                })
            }
        })
    },
}
