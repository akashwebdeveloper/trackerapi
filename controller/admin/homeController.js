const User = require('../../models/user')
const Bazar = require('../../models/bazar')
module.exports = {
    home: (req, res) =>{
        User.estimatedDocumentCount((err, ucount) => {
            if (err) {
                console.log(err)
            }
            Bazar.estimatedDocumentCount((err, bcount) => {
                if (err) {
                    console.log(err)
                }
                return res.render('home', {page_name: 'home', ucount, bcount})
            });
        });
    }
}