require('dotenv').config()
const User = require('../../models/user')
const moment = require('moment');
const m = moment();
const Activity = require('../../models/activity')
const base_url = process.env.base_url
perStepCoin = 0.001;

const level = [
    // 70% in safe point, daily limit depends on perStepCoin
    { level: 1, safePoint: ((2 / perStepCoin) * (70 / 100)), dailyLimit: 2 / perStepCoin, maxCoin: 2 },
    { level: 2, safePoint: ((5 / perStepCoin) * (70 / 100)), dailyLimit: 5 / perStepCoin, maxCoin: 5 },
    { level: 3, safePoint: ((10 / perStepCoin) * (70 / 100)), dailyLimit: 10 / perStepCoin, maxCoin: 10 },
    { level: 4, safePoint: ((15 / perStepCoin) * (70 / 100)), dailyLimit: 15 / perStepCoin, maxCoin: 15 },
    { level: 5, safePoint: ((20 / perStepCoin) * (70 / 100)), dailyLimit: 20 / perStepCoin, maxCoin: 20 }
];




const schedule = require('node-schedule');
const { json } = require('body-parser');
schedule.scheduleJob('0 0 0 * * *', function () {
    // Reset All today data at midnight
    User.updateMany({}, {
        $set: {
            todaysteps: 0,
            todaykm: 0,
            calorie: 0
        }
    }, (err) => { if (err) throw err })


    // Updating PerDay Achievment Status at 12:00 A.M.
    User.find({}, ['progress', 'level'], (err, data) => {
        data.forEach(user => {
            const oneUser = user.progress[user.progress.length - 1];

            if (level[user.level - 1].dailyLimit < oneUser.step) {
                //  status is declare 0 if dailyLimit crossed
                User.findByIdAndUpdate(user._id, { $push: { stepstatus: { date: moment().subtract(1, 'day').format(), status: 0 } } }, (err) => {
                    if (err) throw err;
                })
            } else if (level[user.level - 1].safePoint < oneUser.step) {
                //  status is declare 1 if step achive safe point
                User.findByIdAndUpdate(user._id, { $push: { stepstatus: { date: moment().subtract(1, 'day').format(), status: 1 } } }, (err) => {
                    if (err) throw err;
                })
            } else {
                //  status is declare 2 if step failed to achive safe point
                User.findByIdAndUpdate(user._id, { $push: { stepstatus: { date: moment().subtract(1, 'day').format(), status: 2 } } }, (err) => {
                    if (err) throw err;
                })
            }
        });
    })
});




// Updating Level of User at 12:05 A.M.
schedule.scheduleJob('0 5 0 * * *', function () {
    User.find({}, ['stepstatus', 'level', 'fname'], (err, data) => {
        data.forEach(user => {
            const oneUser = user.stepstatus.slice(-3);
            let dailyLimit = oneUser.filter(oneDay => oneDay.status === 0);
            let doNotSafe = oneUser.filter(oneDay => oneDay.status === 2);
            
           
            if (dailyLimit.length === 3 && user.level >= 1) {
                User.findByIdAndUpdate(user._id, { $inc: { level: 1 } }, (err) => {
                    if (err) throw err;
                })
                

                const activity = new Activity({
                    activitytitle: `${user.fname} reached to Level ${user.level+1}`,
                    for: `level`,
                    reaction: [],
                    photovalue: `${user.level+1}`,
                    userid: user._id
                })

                activity.save((err, items) => {
                    if (err) { throw err }
                    // console.log('Activity Added successfully');
                })
            }

            if (doNotSafe.length === 3 && user.level > 1) {
                User.findByIdAndUpdate(user._id, { $inc: { level: -1 } }, (err) => {
                    if (err) throw err;
                })
                const activity = new Activity({
                    activitytitle: `${user.fname} down to Level ${user.level-1}`,
                    for: `level`,
                    reaction: [],
                    photovalue: `-${user.level-1}`,
                    userid: user._id
                })

                activity.save((err, items) => {
                    if (err) { throw err }
                    // console.log('Activity Added successfully');
                })
            }
        });
    })
});



module.exports = {
    testing: (req, res) => {
        User.find({}, ['stepstatus', 'level', 'fname'], (err, data) => {
            data.forEach(user => {
                const oneUser = user.stepstatus.slice(-3);
                let dailyLimit = oneUser.filter(oneDay => oneDay.status === 0);
                let doNotSafe = oneUser.filter(oneDay => oneDay.status === 2);
                
               
                if (dailyLimit.length === 3 && user.level >= 1) {
                    User.findByIdAndUpdate(user._id, { $inc: { level: 1 } }, (err) => {
                        if (err) throw err;
                    })
                    
    
                    const activity = new Activity({
                        activitytitle: `${user.fname} reached to Level ${user.level+1}`,
                        for: `level`,
                        reaction: [],
                        photovalue: `${user.level+1}`,
                        userid: user._id
                    })
    
                    activity.save((err, items) => {
                        if (err) { throw err }
                        // console.log('Activity Added successfully');
                    })
                }
    
                if (doNotSafe.length === 3 && user.level > 1) {
                    User.findByIdAndUpdate(user._id, { $inc: { level: -1 } }, (err) => {
                        if (err) throw err;
                    })
                    const activity = new Activity({
                        activitytitle: `${user.fname} down to Level ${user.level-1}`,
                        for: `level`,
                        reaction: [],
                        photovalue: `-${user.level-1}`,
                        userid: user._id
                    })
    
                    activity.save((err, items) => {
                        if (err) { throw err }
                        // console.log('Activity Added successfully');
                    })
                }
            });
        })



        return res.status(200).json({
            status: true
        })
    },
    todayprogress: (req, res) => {
        const { uid, step, km, calorie } = req.body

        User.findOneAndUpdate({ _id: uid }, {
            $inc: {
                todaysteps: parseInt(step),
                todaykm: km,
                calorie: parseInt(calorie)
            }
        }, { new: true }, (err, items) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }
            return res.status(201).json({
                success: true,
                message: "succesfully Updated Steps data",
                data: items
            })
        })
    },
    updates: (req, res) => {
        const { uid, step } = req.body

        // Updating Progress graph for step
        User.findOne({ _id: uid }, (err, items) => {

            // Challenge Updating
            User.updateMany({ "challenges.cstatus": 1 }, { $inc: { 'challenges.$.cstep': parseInt(step) } }, (err) => {
                if (err) throw err;
            })


            const todaysteps = { date: moment().format(), step: parseInt(step) };
            const todayEarning = { date: moment().format(), for: `${step} steps`, reason: 0, coin: parseFloat((parseInt(step) * perStepCoin), 2) };



            var allProgress;
            var allEarning;
            var oldStep;
            let progress = items.progress.filter(prog => (moment(prog.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')));
            let earning = items.earnedcoin.filter(earn => (moment(earn.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) && earn.reason == 0);


            if (items.progress.length === 0) {
                allProgress = [];
                allProgress.push(todaysteps);

            } else if (progress.length === 0) {
                allProgress = items.progress;
                allProgress.push(todaysteps);

            } else {
                allProgress = items.progress;
                allProgress.forEach((element, index) => {
                    if (moment(element.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                        oldStep = allProgress[index].step;
                        allProgress[index].step += parseInt(step);
                    }
                });
            };


            if (!items.earnedcoin.length) {
                allEarning = [];
                allEarning.push(todayEarning)

            } else if (!earning.length) {
                allEarning = items.earnedcoin;
                allEarning.push(todayEarning)

            } else {
                allEarning = items.earnedcoin;
                allEarning.forEach((element, index) => {

                    if (moment(element.date).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') && element.reason === 0) {
                        allEarning[index].for = `${oldStep + parseInt(step)} steps`
                        allEarning[index].coin += parseFloat((parseInt(step) * perStepCoin), 2)
                    }
                });
            }


            User.findOneAndUpdate({ _id: uid }, { $set: { progress: allProgress, earnedcoin: allEarning } }, { new: true }, (err) => {
                if (err) throw err;
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
    weeklyProgressGraph: (req, res) => {
        const { uid } = req.body

        User.findById(uid, ['progress'], (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }

            // Function For Getting weekDays 
            function getWeekRange(week = 0) {
                var weekStart = moment().add(week, 'weeks').startOf('week');
                return [...Array(7)].map((_, i) =>
                    weekStart.clone().add(i, 'day').format('YYYY-MM-DD')
                );
            }

            const graph = [];

            // for Increase week days increase number of i 
            for (let i = 0; i >= -3; i--) {

                var currentWeek = getWeekRange(i);

                const pushObj = {
                    week: Math.abs(i)
                };

                var totalStepInWeek = 0;
                currentWeek.forEach((date) => {
                    // Find if the array contains an object by comparing the property value
                    if (result.progress.some((person) => moment(person.date).format('YYYY-MM-DD') === date)) {
                        // Finding index number which object date matched with last 7 days
                        const got = result.progress.findIndex(person => moment(person.date).format('YYYY-MM-DD') === date);

                        totalStepInWeek += Number(result.progress[got].step);
                    }
                });
                pushObj.steps = totalStepInWeek;
                graph.push(pushObj);
            }


            console.log(graph);




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


        // Function for returning all the activity data
        function activityDetails(uid, array) {
            User.findById(uid, ['photos','username'], (err, data2) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        message: "err from database",
                        error: err
                    })
                }

                if (!data2) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "user doesn't exist"
                    })
                }

                array.forEach(element1 => {
                    const pushActivity = {};
                    pushActivity.profile = data2.photos
                    pushActivity.activityid = element1._id
                    pushActivity.username = data2.username
                    pushActivity.userid = data2._id
                    pushActivity.activitytitle = element1.activitytitle
                    pushActivity.reaction = element1.reaction.length
                    pushActivity.photo = `${base_url}/img/${element1.photovalue}.png`
                    pushActivity.donotuse = element1.createdAt

                    const postingTime = moment(element1.createdAt)

                    const days = moment().diff(postingTime, 'days')


                    var time = "";
                    if (days === 0) {
                        time += `Today`;
                    } else if(days< 31) {
                        time += `${days} d`;
                    } else {
                        time += `${Math.trunc(days/31)} mn`;
                    } 

                    pushActivity.timeago = time
                    activity.push(pushActivity)
                })

                const sortedArray = activity.sort((a, b) => new moment(a.donotuse).format('YYYYMMDD') - new moment(b.donotuse).format('YYYYMMDD'))


                return res.status(201).json({
                    success: true,
                    message: myactivityonly ? 'Only User Activity' : 'All Activity',
                    activity: sortedArray
                })
            });
        }



        const activity = [];
        if (myactivityonly === true) {
            Activity.find({ userid: uid }, ['activitytitle', 'for', 'reaction', 'photovalue', 'userid'], (err, data1) => {
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
