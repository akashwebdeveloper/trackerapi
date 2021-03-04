const User = require('../../models/user')
const moment = require('moment');
const m = moment();
const todayDate = m.format('yy.MM.DD');

module.exports = {
    todayprogress: (req, res) => {
        const { uid, step, km, calorie } = req.body

// const todaysteps = {};
// todaysteps[todayDate] = step
// console.log(todaysteps);


        const user = new User({
            todaysteps: step || "",
            todaykm: km,
            calorie: calorie || "",
        })

        // Convert the Model instance to a simple object using Model's 'toObject' function
        // to prevent weirdness like infinite looping...
        var upsertData = user.toObject();

        // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
        delete upsertData._id;


        User.findOneAndUpdate({ _id: uid }, upsertData, {new: true}, (err, items) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database",
                    error: err
                })
            }
            
            // User.findOneAndUpdate({ _id: uid }, { $push: { progress: todaysteps  } }, {new: true}, (err, items) => {
            //     if (err) {
            //         return res.status(502).json({
            //             success: false,
            //             message: "err from database",
            //             error: err
            //         })
            //     }
            // }) 
            

            return res.status(201).json({
                success: false,
                message: "succesfully Updated Steps data",
                data: items
            })
        }) 
    },
}
