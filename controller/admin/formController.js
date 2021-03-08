const Admin = require('../../models/admin')


module.exports = {
    getreferralform: (req, res) => {

        Admin.find({}, (err, data)=>{
            
            return res.render('referral', { 
                page_name: 'form',
                sub_page: 'referral',
                referral: data[0].referral
             })
        })
    },
    updatereferral: (req, res) => {
        const { referral } = req.body
        
        Admin.updateOne({type: "admin"}, { $set: { referral: referral } }, (err, data)=>{

            return res.redirect('/admin/referral')
        })
    },
}