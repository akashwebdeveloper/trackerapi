const User = require('../../models/user')
const moment = require('moment');
const m = moment();
const todayDate = m.format()
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
            let progress = items.progress.filter(prog => (prog.date == todayDate));

            
            if (items.progress.length === 0) {
                allProgress = [];
                allProgress.push(todaysteps)

            } else if (progress.length === 0) {
                allProgress = items.progress;
                allProgress.push(todaysteps)
                
            } else {
                allProgress = items.progress;
                allProgress.forEach((element, index) => {

                    if (element.date == todayDate) {
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
            result.progress.forEach((daily, index) => {
                const li = result.progress[result.progress.length - (index + 1)]
                const din = moment(li.date).format('ddd')
                
                li.day = din
                graph.push(li)
                if (index === 6) { return false }
            });


            return res.status(201).json({
                success: true,
                message: "weekly progress graph are here",
                graph
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
}
