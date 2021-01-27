module.exports = {
    auth: (req, res, next)=> {
        if(req.isAuthenticated() && req.user.type === 'admin') {
            return next()
        }
        return res.redirect('/admin/login')
    }
}