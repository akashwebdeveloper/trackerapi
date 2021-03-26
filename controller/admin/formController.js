const Admin = require('../../models/admin')
const User = require('../../models/user')
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
        
        User.countDocuments((err, count)=>{

            return res.render('challengeform', {
                page_name: 'form',
                sub_page: 'challengeform',
                time: todayDate,
                userLength: count
            })
        });
    },
    createchallenge: (req, res) => {
        
        const { name, status, goal, reward, starttime, about, expiretime } = req.body

        const challenge = new Challenge({
            name: name,
            status: status,
            goal: goal,
            reward: reward,
            starttime: starttime,
            expiretime: expiretime,
            about: about
        })


        challenge.save((err, items) => {
            if (err) { throw err }
            res.redirect('/admin/challenge')
        })
    },
    updatechallenge: (req, res) => {
        const {  } = req.body
    },
    challengetable: (req, res) => {
        Challenge.find({}, (err, data) => {
            data.forEach(challenge => {
                if (new Date(challenge.starttime).getTime() >= new Date().getTime()) {
                    Challenge.updateOne({_id: challenge._id},{new: true}, {$set: {startstatus: 'coming'}}, (err)=>{
                        if (err) throw err;
                        // console.log('coming Successfully Updated');
                    })
                }else {
                    Challenge.updateOne({_id: challenge._id}, {$set: {startstatus: 'started'}}, (err)=>{
                        if (err) throw err;
                        // console.log('StartStatus Successfully Updated');
                    })
                }
            })
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
                        sub_page: 'challenge',
                        moment: moment
                    })
                });
            });
        } catch (error) {
            console.log(error);
        }
    },
    getcategoryform: (req, res) => {
        Admin.find((err,result)=>{
            return res.render('categoryform', {
                page_name: 'category',
                sub_page: '',
                data: result[0]
                // time: todayDate
            })
        })
    },
    addCategory: (req, res) => {
        const { id, category } = req.body;
        Admin.findByIdAndUpdate(id, { $push: { category: category }}, (err,result)=>{
            if (err) throw err;
            res.redirect('/admin/category')
            
        })
    },
    deleteCategory: (req, res) => {
        const { id, category } = req.params;
        Admin.findByIdAndUpdate(id, { $pull: { category:   category} }, (err,result)=>{
            if (err) throw err;
            res.redirect('/admin/category')
        })
    },
}