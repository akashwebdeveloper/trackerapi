const router = require('express').Router();
const { login, postLogin  } = require('../controller/admin/authController')
const { home} = require('../controller/admin/homeController')

router.get('/', home)
router.get('/login', login)
router.post('/login', postLogin)
module.exports = router;

