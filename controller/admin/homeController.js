module.exports = {
    home: (req, res) =>{
        return res.render('home', {page_name: 'home'})
    }
}