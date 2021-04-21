const Admin = require('../../models/admin')
const User = require('../../models/user')
const moment = require('moment');


module.exports = {
    getFAQForm: (req, res) => {

        Admin.find({}, (err, data) => {

            return res.render('faq', {
                page_name: 'setting',
                sub_page: 'faq',
                referral: data[0].referral
            })
        })
    },
    addFAQ: (req, res) => {
        const { question, answer } = req.body
        console.log(question);
        console.log(typeof answer);


        const pushObj = {
            question,
            answer: (typeof answer === 'string') ? [answer] : answer
        }
        // new Noty({
        //     ...
        //     text: 'Some notification text',
        //     ...
        // }).show();


        Admin.updateOne({}, { $push: { f_a_q: pushObj } }, (err, data) => {
            if (err) throw err;
            console.log(data);

            res.redirect('/admin/getfaqform')
        })
    }
}