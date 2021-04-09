const User = require('../../models/user')
const Activity = require('../../models/activity')
const moment = require('moment');
const m = moment();

module.exports = {
    getalldata: (req, res) => {

        User.find({ }, ['email', 'fname', 'lname', 'username', 'photos'], (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users[0]) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user doesn't exist"
                })
            }
            return res.status(200).json({
                success: true,
                status: 200,
                message: "user data Available",
                user: users
            })
        })
    },
    getdata: (req, res) => {
        const { id } = req.body

        // if (id.substr(id.length - 3) == 'com') {
        //     var EMAIL = req.body.id
        // } else if (id.substr(id.length - 2) == 'in') {
        //     var EMAIL = req.body.id
        // } else {
        //     var ID = req.body.id
        // }
        User.find({ _id: id },{ '_id': 0, 'earnedcoin' :0, 'spendcoin': 0, 'challenges': 0, 'progress': 0, 'synccontact': 0}, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users[0]) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user doesn't exist"
                })
            }

            return res.status(200).json({
                success: true,
                status: 200,
                message: "user data Available",
                user: users
            })
        })
    },
    searchUserData: (req, res) => {
        const { uid, fid } = req.body

        User.find({ _id:fid },['following', 'followers', 'earnedcoin', 'username', 'photos' ], (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users[0]) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user doesn't exist"
                })
            }
            const info ={
                _id: users[0]._id,
                following: users[0].following.length,
                followers: users[0].followers.length,
                earnedcoin: users[0].earnedcoin,
                username: users[0].username,
                photos: users[0].photos,
            };

            Activity.find({ userid: fid, for: { '$regex': `^level`, '$options': 'i' } }, (err, result) => {
                const level = result[result.length - 1].for
                info.level = level;


                
                if (users[0].following.includes(fid)) {
                    info.isFollowed = true;
                } else {
                    info.isFollowed = false;
                }
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "user data Available",
                    user: info
                })
            })
        })
    },
    update: (req, res) => {
        const { id, type, fname, lname, username, dob, gender, weight, height, token, status } = req.body

        if (id.substr(id.length - 3) == 'com') {
            var EMAIL = req.body.id
        } else if (id.substr(id.length - 2) == 'in') {
            var EMAIL = req.body.id
        } else {
            var ID = req.body.id
        }

        User.find({ $or: [{ _id: ID }, { email: EMAIL }] }, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (!users[0]) {
                return res.status(202).json({
                    success: false,
                    status: 202,
                    message: "user doesn't exist"
                })
            }

            const user = new User({
                type: type || users[0].type,
                fname: fname || users[0].fname,
                lname: lname || users[0].lname,
                username: username || users[0].username,
                dob: dob || users[0].dob,
                gender: gender || users[0].gender,
                weight: weight || users[0].weight,
                height: height || users[0].height,
                token: token || users[0].token,
                status: status || users[0].status,
            })

            // Convert the Model instance to a simple object using Model's 'toObject' function
            // to prevent weirdness like infinite looping...
            var upsertData = user.toObject();

            // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
            delete upsertData._id;


            User.findOneAndUpdate({ $or: [{ _id: ID }, { email: EMAIL }] }, upsertData, (err, users) => {
                if (err) {
                    console.log(err);
                }

                if (users) {

                    User.find({ _id: users._id }, (err, users) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                status: 502,
                                message: "err from database"
                            })
                        }

                        if (!users[0]) {
                            return res.status(202).json({
                                success: false,
                                status: 202,
                                message: "user doesn't exist"
                            })
                        }

                        return res.status(202).json({
                            success: true,
                            status: 200,
                            message: "User updated successfuly ",
                            user: users
                        })
                    })
                }
            })
        })
    },
    emailverification: (req, res) => {
        const { email } = req.body

        // User.findOne({ $or: [{ phone: phone }, { email: email }] }, (err, users) => {
        User.findOne({ email: email }, (err, users) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    status: 502,
                    message: "err from database"
                })
            }

            if (users) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "user Already exist",
                    data: users
                })
            }

            return res.status(200).json({
                success: false,
                status: 200,
                message: "New user",
            })
        })
    },
    getAllUsername: (req, res) => {
        const { username } = req.body

        User.find({ username: { '$regex': `^${username}`, '$options': 'i' } }, ['_id', 'username', 'photos'], (err, result) => {
            if (err) {
                return res.status(502).json({
                    success: false,
                    message: "err from database"
                })
            }

            if (result) {
                return res.status(202).json({
                    success: true,
                    message: "All username are here",
                    data: result
                })
            }
        })
    },
    getSyncNumber: (req, res) => {
        const { uid } = req.body

        User.find({}, ['_id', 'phone', 'username', 'phone'], (err, data1) => {
            User.findById(uid, ['synccontact', 'following'], (err, data2) => {
                if (err) throw err


                const finalArray = [];
                data1.forEach((e1) => data2.synccontact.forEach((e2) => {
                    if (e1.phone === e2) {
                        const pushObj = { _id: e1._id, username: e1.username, phone: e1.phone }
                        finalArray.push(pushObj)
                    }
                }))


                const final = finalArray.filter(entry1 => !data2.following.some(entry2 => entry1._id.toString() === entry2.toString()));



                return res.status(200).json({
                    success: true,
                    message: "mobile Number Successfully synced",
                    data: final
                })
            })
        })
    },
    syncNumber: (req, res) => {
        const { uid, arrayofnumber } = req.body

        User.find({}, ['_id', 'phone'], (err, datas) => {

            const finalArray = [];
            datas.forEach((e1) => arrayofnumber.forEach((e2) => {
                if (e1.phone === e2 && e1._id != uid) {
                    finalArray.push(e1.phone)
                }
            }))



            User.findByIdAndUpdate(uid, { synccontact: finalArray }, (err, data) => {
                if (err) throw err
                return res.status(200).json({
                    success: true,
                    message: "mobile Number Successfully synced"
                })
            })
        })
    },
    deleteSyncNumber: (req, res) => {
        const { uid, snumber } = req.body

        User.findById(uid, ['synccontact'], (err, data) => {

            const synccontact = data.synccontact;
            var index = synccontact.map(x => {
                return x;
            }).indexOf(snumber);

            // deleting from array
            synccontact.splice(index, 1);

            // After deleteing number from array just updating array
            User.findByIdAndUpdate(uid, { synccontact }, (err, data) => {
                if (err) throw err
                return res.status(200).json({
                    success: true,
                    message: "mobile Number delete successfully from Sync Contact"
                })
            })
        })
    },
    coinDetails: (req, res) => {
        const { uid } = req.body

        User.findById(uid, ['earnedcoin', 'spendcoin'], (err, items) => {

            var earnedcoin = 0;
            var spendcoin;
            var currentcoin;
            var transaction = [];


            if (!items.earnedcoin.length) {
                earnedcoin = 0;
            } else {
                items.earnedcoin.forEach(daily => {
                    var pushObj = {};
                    pushObj.date = moment(daily.date).format('DD MMM YYYY')
                    pushObj.content = daily.for
                    pushObj.coin = daily.coin;
                    pushObj.isEarned = true;
                    pushObj.donotuse = daily.date;
                    
                    
                    transaction.push(pushObj);
                    

                    // User total Steps
                    earnedcoin += daily.coin
                });
            }


            if (!items.spendcoin.length) {
                spendcoin = 0;
            } else {
                items.spend.forEach((daily) => {

                    var pushObj = {};
                    pushObj.date = moment(daily.date).format('DD MMM YYYY')
                    pushObj.content = daily.for
                    pushObj.coin = daily.coin;
                    pushObj.isEarned = false;
                    pushObj.donotuse = daily.date;

                    transaction.push(pushObj);
                    
                    // User Total spend coin
                    spendcoin += parseInt(daily.coin)
                });
            }

            // Current Coin
            currentcoin = (earnedcoin - spendcoin).toFixed(2);
            earnedcoin = earnedcoin.toFixed(2);
            spendcoin = spendcoin.toFixed(2);
            

            const sortedArray = transaction.sort((a, b) => new moment(a.donotuse).format('YYYYMMDD') - new moment(b.donotuse).format('YYYYMMDD'));

            return res.status(200).json({
                success: true,
                message: "Coin Details are here",
                data: {
                    transaction: sortedArray,
                    currentcoin,
                    earnedcoin,
                    spendcoin
                }
            })
        })
    },
    friendsRanking: (req, res) => {
        const { uid } = req.body

        User.find({}, ['progress', 'username', 'fname', 'lname'], (err, data1) => {
            User.findById(uid, ['following'], (err, data2) => {

                const following = [];
                data2.following.forEach((e1) => data1.forEach((e2) => {

                    if (e1.toString() === e2._id.toString()) {
                        following.push(e2)
                    }
                }))
                // console.log(following);

                const ranking = [];

                following.forEach(friends => {
                    var step = 0;
                    let rank = {};
                    if (friends.progress.length != 0) {
                        for (let index = 0; index < 7; index++) {

                            // Find if the array contains an object by comparing the property value
                            if (friends.progress.some((person) => moment(person.date).format('YYYY-MM-DD') === moment(new Date()).subtract(index, 'day').format('YYYY-MM-DD'))) {
                                // Finding index number which object date matched with last 7 days
                                const got = friends.progress.findIndex(person => moment(person.date).format('YYYY-MM-DD') === moment(new Date()).subtract(index, 'day').format('YYYY-MM-DD'));
                                step += Number(friends.progress[got].step)
                            } else {
                                step += 0;
                            }
                        }
                        rank.username = friends.username,
                            rank.name = `${friends.fname} ${friends.lname}`,
                            rank.step = step
                        ranking.push(rank)
                    } else {
                        rank.username = friends.username,
                            rank.name = `${friends.fname} ${friends.lname}`,
                            rank.step = 0
                        ranking.push(rank)
                    }
                });

                // creating last 7 days Formate
                const currentDate = moment(new Date());
                const before7days = moment(new Date()).subtract(6, 'day');
                const last7dateFormate = `${before7days.format('ddd')}, ${before7days.format('D')} ${before7days.format('MMM')} - ${currentDate.format('ddd')}, ${currentDate.format('D')} ${currentDate.format('MMM')}`


                return res.status(200).json({
                    success: true,
                    message: "mobile Number Successfully synced",
                    Rank: {
                        last7dateFormate,
                        ranking
                    }
                })
            })
        })
    },
}

