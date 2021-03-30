const User = require('../../models/user')
const moment = require('moment');
const m = moment();
const todayDate = m.format()
const Activity = require('../../models/activity')
const level = [
    { level: 0, step: 1000 },
    { level: 1, step: 3000 },
    { level: 2, step: 7000 },
    { level: 3, step: 15000 },
    { level: 4, step: 25000 },
    { level: 5, step: 40000 },
    { level: 6, step: 65000 },
    { level: 7, step: 105000 },
    { level: 8, step: 165000 },
    { level: 9, step: 255000 },
    { level: 10, step: 380000 },
    { level: 11, step: 530000 },
]

// const todayDate = '2021.03.01'


module.exports = {
    todayprogress: (req, res) => {
        const { uid, step, km, calorie } = req.body

        const user = new User({
            todaysteps: step || "",
            todaykm: km,
            calorie: calorie || ""
        })

        // Convert the Model instance to a simple object using Model's 'toObject' function
        // to prevent weirdness like infinite looping...
        var upsertData = user.toObject();

        // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
        delete upsertData._id;


        User.findOneAndUpdate({ _id: uid }, upsertData, { new: true }, (err, items) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }
            return res.status(201).json({
                success: false,
                message: "succesfully Updated Steps data",
                data: items
            })
        })
    },
    updates: (req, res) => {
        const { uid, step } = req.body

        // Updating Activity level
        Activity.find({ userid: uid }, (err, result) => {

            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database in Activity",
                    error: err
                })
            }

            if (result.length === 0) {
                User.findById(uid, (err, result2) => {

                    const activity = new Activity({
                        for: `level 0`,
                        achivement: `Welcome to United By Step Activity`,
                        reaction: [],
                        photo: '',
                        userid: uid,
                        username: result2.username
                    })

                    activity.save((err, items) => {
                        if (err) { throw err }
                        // console.log('Activity Added successfully');

                    })
                })
            } else {
                var totalStep = 0;
                User.findById(uid, (err, result1) => {
                    if (err) {
                        return res.status(502).json({
                            success: false,
                            message: "err from database",
                            error: err
                        })
                    }

                    if (result1.progress.length != 0) {
                        result1.progress.forEach((daily) => {
                            // User total Steps
                            totalStep += parseInt(daily.step)
                        });
                    }



                    if (level.some((upgrade) => upgrade.step > totalStep)) {
                        // Finding index number which object date matched with last 7 days
                        const got = level.findIndex(upgrade => upgrade.step > totalStep);

                        const found = result.some(activity => activity.for === `level ${level[got].level}`);
                        if (!found) {

                            const activity = new Activity({
                                for: `level ${level[got].level}`,
                                achivement: `Crossed Level ${level[got].level}`,
                                reaction: [],
                                photo: '',
                                userid: uid,
                                username: result1.username
                            })


                            activity.save((err, items) => {
                                if (err) { throw err }
                                // console.log('Activity Added successfully');
                            })
                        };
                    }
                })
            }
        })





        // Updating Progress graph for step
        User.findOne({ _id: uid }, (err, items) => {


            console.log('okkk');

            // Challenge Updating
            let userChallenge = items.challenges.filter(oneByOne => oneByOne.cstatus == 0);
            console.log(userChallenge);
            





            const todaysteps = { date: todayDate, step: step };
            var totalStep = 0;
            items.progress.forEach((daily, index) => {
                // User total Steps
                totalStep += parseInt(daily.step)
            });


            // Adding Coins
            var coin = (totalStep * 0.001).toFixed(2);


            var allProgress;
            let progress = items.progress.filter(prog => (moment(prog.date).format('YYYY-MM-DD') == m.format('YYYY-MM-DD')));


            if (items.progress.length === 0) {
                allProgress = [];
                allProgress.push(todaysteps)

            } else if (progress.length === 0) {
                allProgress = items.progress;
                allProgress.push(todaysteps)

            } else {
                allProgress = items.progress;
                allProgress.forEach((element, index) => {

                    if (moment(element.date).format('YYYY-MM-DD') == m.format('YYYY-MM-DD')) {
                        allProgress[index].step = step
                    }
                });
            }
            User.findOneAndUpdate({ _id: uid }, { $set: { progress: allProgress, coin: coin } }, { new: true }, (err, items) => {

                return res.status(201).json({
                    success: true,
                    message: "succesfully Updated Steps data for graph",
                })
            })
        })
    },
    progressgraph: (req, res) => {
        const { uid } = req.body

        User.findById(uid, (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }


            const graph = [];

            for (let index = 0; index < 7; index++) {
                const li = {};

                // console.log(moment(new Date()).subtract(index, 'day').format('YYYY-MM-DD'));

                // Find if the array contains an object by comparing the property value
                if (result.progress.some((person) => moment(person.date).format('YYYY-MM-DD') === moment(new Date()).subtract(index, 'day').format('YYYY-MM-DD'))) {
                    // Finding index number which object date matched with last 7 days
                    const got = result.progress.findIndex(person => moment(person.date).format('YYYY-MM-DD') === moment(new Date()).subtract(index, 'day').format('YYYY-MM-DD'));

                    const din = moment(result.progress[got].date).format('ddd');
                    li.date = result.progress[got].date;
                    li.step = Number(result.progress[got].step);
                    li.day = din;

                    graph.push(li);

                } else {
                    li.date = moment(new Date()).subtract(index, 'd').format();
                    li.step = 0;
                    li.day = moment(new Date()).subtract(index, 'd').format('ddd');
                    graph.push(li);
                }
            }

            const sortedArray = graph.sort((a, b) => new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD'))


            return res.status(201).json({
                success: true,
                message: "weekly progress graph are here",
                graph: sortedArray
            })
        })
    },
    totalstep: (req, res) => {
        const { uid } = req.body

        User.findById(uid, (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }

            var totalStep = 0;
            result.progress.forEach((daily, index) => {

                // User total Steps
                totalStep += parseInt(daily.step)

            });

            // User Average Steps
            const averageStep = Math.round(totalStep / result.progress.length);

            return res.status(201).json({
                success: true,
                message: "Average and Total steps are here",
                totalStep,
                averageStep
            })


        })
    },
    reaction: (req, res) => {
        const { uid, aid, reaction } = req.body

        Activity.findById(aid, (err, data) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }


            // finding that uid is already react on this activity or not
            const found = data.reaction.some(react => react.uid === uid);
            if (data.reaction.length === 0 || !found) {
                Activity.findOneAndUpdate(
                    { _id: aid },
                    {
                        $push: {
                            reaction: {
                                "uid": uid,
                                "react": reaction
                            }
                        }
                    }, (err) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                message: "err from database",
                                error: err
                            })
                        }
                        return res.status(201).json({
                            success: true,
                            message: "your reaction is submitted"
                        })
                    })
            } else {
                Activity.updateOne({ "_id": aid, "reaction.uid": uid },
                    { $set: { "reaction.$.react": reaction } }, (err, result) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                message: "err from database",
                                error: err
                            })
                        }
                        return res.status(201).json({
                            success: true,
                            message: `your reaction changed to ${reaction}`
                        })
                    })
            }
        })
    },
    getActivity: (req, res) => {
        const { uid, myactivityonly } = req.body

        // Updating Activity level
        Activity.find({ userid: uid }, (err, result) => {

            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database in Activity",
                    error: err
                })
            }

            if (result.length === 0) {
                User.findById(uid, (err, result2) => {

                    const activity = new Activity({
                        for: `level 0`,
                        achivement: `Welcome to United By Step Activity`,
                        reaction: [],
                        photo: '',
                        userid: uid,
                        username: result2.username
                    })

                    activity.save((err, items) => {
                        if (err) { throw err }
                        // console.log('Activity Added successfully');

                    })
                })
            } else {
                var totalStep = 0;
                User.findById(uid, (err, result1) => {
                    if (err) {
                        return res.status(502).json({
                            success: false,
                            message: "err from database",
                            error: err
                        })
                    }

                    if (result1.progress.length != 0) {
                        result1.progress.forEach((daily) => {
                            // User total Steps
                            totalStep += parseInt(daily.step)
                        });
                    }



                    if (level.some((upgrade) => upgrade.step > totalStep)) {
                        // Finding index number which object date matched with last 7 days
                        const got = level.findIndex(upgrade => upgrade.step > totalStep);

                        const found = result.some(activity => activity.for === `level ${level[got].level}`);
                        if (!found) {

                            const activity = new Activity({
                                for: `level ${level[got].level}`,
                                achivement: `Crossed Level ${level[got].level}`,
                                reaction: [],
                                photo: '',
                                userid: uid,
                                username: result1.username
                            })


                            activity.save((err, items) => {
                                if (err) { throw err }
                                // console.log('Activity Added successfully');
                            })
                        };
                    }
                })
            }
        })

        // Function for returning all the activity data
        function activityDetails(uid, array) {
            User.findById(uid, ['photos'], (err, data2) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: "err from database",
                        error: err
                    })
                }

                array.forEach(element1 => {
                    const pushActivity = {};
                    pushActivity.profile = data2.photos
                    pushActivity.activityid = element1._id
                    pushActivity.username = element1.username
                    pushActivity.achivement = element1.achivement
                    pushActivity.reaction = element1.reaction.length
                    pushActivity.donotuse = element1.createdAt

                    const postingTime = moment(element1.createdAt)
                    const today = moment()

                    const days = today.diff(postingTime, 'days')
                    const hours = today.diff(postingTime, 'hours') - (24 * (days));
                    const minutes = (today.diff(postingTime, 'minutes') - (1440 * (days))) - (60 * hours);


                    var time = "";
                    if (days > 0) {
                        time += `${days} d`;
                    } else if (hours > 0) {
                        time += `${hours} h`;
                    } else if (minutes > 0) {
                        time += `${minutes} m`;
                    } else {
                        time += `just a second ago`;
                    }

                    pushActivity.timeago = time
                    activity.push(pushActivity)
                })

                const sortedArray = activity.sort((a, b) => new moment(a.donotuse).format('YYYYMMDD') - new moment(b.donotuse).format('YYYYMMDD'))


                return res.status(201).json({
                    success: true,
                    message: `Only User Activity`,
                    activity: sortedArray
                })
            });
        }



        const activity = [];
        if (myactivityonly === true) {
            Activity.find({ userid: uid }, ['achivement', 'username', 'createdAt', 'reaction'], (err, data1) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: "err from database",
                        error: err
                    })
                }

                // returning all activity user and his following
                activityDetails(uid, data1)

            })
        } else {
            User.findById(uid, ['following'], (err, data) => {

                // Finding that id which account is not private
                User.find({ _id: { $in: data.following }, private: false }, ['_id'], (err, data1) => {
                    const FollowingArray = [];

                    // extracting from object
                    data1.forEach(element => {
                        FollowingArray.push(String(element._id));
                    });
                    // pushing Userid for getting user activity also
                    FollowingArray.push(uid);

                    Activity.find({ userid: { $in: FollowingArray } }, function (err, array) {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                message: "err from database",
                                error: err
                            })
                        }
                        // returning all activity user and his following
                        activityDetails(uid, array)
                    });
                })
            })
        }
    },
    challengeStepUpdate: (req, res) => {
        // const { uid, step } = req.body

        //     Challenge.find({joined: { $in: [ uid ] } }, ['_id', 'name', 'startstatus', 'goal','starttime', 'expiretime'], (err, datas) => {
        //     // User.findOne({ email: email }, (err, users) => {

        //     if (err) {
        //         return res.status(502).json({
        //             success: false,
        //             status: 502,
        //             message: "err from database"
        //         })
        //     }

        //     let challenges = datas.filter(challenge => (moment(challenge.starttime).format('YYYY-MM-DD hh:mm') <= m.format('YYYY-MM-DD hh:mm')));
        //     console.log(challenges);




        //     const todaysteps = { challenge_id: name, step: step };

        //     // Adding Coins
        //     var coin = (totalStep*0.001).toFixed(2);


        //     var allProgress;
        //     let progress = items.progress.filter(prog => (moment(prog.date).format('YYYY-MM-DD') == m.format('YYYY-MM-DD')));


        //     if (items.progress.length === 0) {
        //         allProgress = [];
        //         allProgress.push(todaysteps)

        //     } else if (progress.length === 0) {
        //         allProgress = items.progress;
        //         allProgress.push(todaysteps)

        //     } else {
        //         allProgress = items.progress;
        //         allProgress.forEach((element, index) => {

        //             if (moment(element.date).format('YYYY-MM-DD') == m.format('YYYY-MM-DD')) {
        //                 allProgress[index].step = step
        //             }
        //         });

        //     }
        //     User.findOneAndUpdate({ _id: uid }, { $set: { progress: allProgress, coin: coin } }, { new: true }, (err, items) => {

        //         return res.status(201).json({
        //             success: false,
        //             message: "succesfully Updated Steps data for graph",
        //         })

        //     })


        // })  
    },
}
