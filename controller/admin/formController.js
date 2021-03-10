const Admin = require('../../models/admin')
const Challenge = require('../../models/challenge')
const moment = require('moment');
const m = moment();
const todayDate = m.format('YYYY-MM-DDTHH:mm')

module.exports = {
    getreferralform: (req, res) => {

        Admin.find({}, (err, data) => {

            return res.render('referral', {
                page_name: 'form',
                sub_page: 'referral',
                referral: data[0].referral
            })
        })
    },
    updatereferral: (req, res) => {
        const { referral } = req.body

        Admin.updateOne({ type: "admin" }, { $set: { referral: referral } }, (err, data) => {

            return res.redirect('/admin/referral')
        })
    },
    getchallengeform: (req, res) => {
        return res.render('challengeform', {
            page_name: 'form',
            sub_page: 'challengeform',
            time: todayDate
        })
    },
    createchallenge: (req, res) => {
        
        const { name, status, goal, reward, starttime, about } = req.body

        const challenge = new Challenge({
            name: name,
            status: status,
            goal: goal,
            reward: reward,
            starttime: starttime,
            about: about
        })



        challenge.save((err, items) => {
            if (err) { throw err }
            res.redirect('/admin/challenge')
        })
    },
    updatechallenge: (req, res) => {
        const { referral } = req.body

        Admin.updateOne({ type: "admin" }, { $set: { referral: referral } }, (err, data) => {

            return res.redirect('/admin/challengeform')
        })
    },
    challengetable: (req, res) => {
        Challenge.find({}, (err, data) => {

            // console.log(moment(data[0].starttime).format('DD/MM/YYYY hh:mm a'));

        })
        try {
            var query = {};
            var page = 1;
            var perpage = 10;
            if (req.query.page != null) {
                page = req.query.page
            }
            query.skip = (perpage * page) - perpage;
            query.limit = perpage;
            //    getting data in limit for pagination
            Challenge.find({}, {}, query, (err, data) => {
                if (err) {
                    console.log(err);
                }
                
                Challenge.estimatedDocumentCount((err, count) => {
                    if (err) {
                        console.log(err)
                    }

                    return res.render('challengetable', {
                        data: data,
                        current: page,
                        pages: Math.ceil(count / perpage),
                        page_name: 'table',
                        perpage,
                        sub_page: 'challengeform',
                        timeset: moment
                    })
                });
            });
        } catch (error) {
            console.log(error);
        }
    },
}