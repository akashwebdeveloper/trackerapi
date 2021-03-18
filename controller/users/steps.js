const User = require('../../models/user')
const moment = require('moment');
const m = moment();
const todayDate = m.format()
const Challenge = require('../../models/challenge')

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
        
        User.findOne({ _id: uid }, (err, items) => {
            
            //    console.log(items);
            
            const todaysteps = { date: todayDate, step: step };
            var totalStep = 0;
            items.progress.forEach((daily, index) => {
                // User total Steps
                totalStep += parseInt(daily.step)
            });
            

            // Adding Coins
            var coin = (totalStep*0.001).toFixed(2);


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
                    success: false,
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
            result.progress.every((daily, index) => {

                const steps = result.progress[result.progress.length - (index + 1)]
                const li = {};
                if (moment(steps.date).format('YYYY-MM-DD') !== moment(new Date()).subtract(index-1, 'day').format('YYYY-MM-DD')) {

                    li.date = moment(new Date()).subtract(index, 'd').format();
                    li.step = 0;
                    li.day = moment(new Date()).subtract(index, 'd').format('ddd');
                }else{
                    
                    const din = moment(steps.date).format('ddd')
                    li.date = steps.date;
                    li.step = steps.step;
                    li.day = din;
                    console.log(li);
                }
                graph.push(li);
                if (index === 6) { return false }
                return true;
            });

            const sortedArray  = graph.sort((a,b) => new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD'))


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
