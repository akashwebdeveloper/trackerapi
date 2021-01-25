const {auth} = require('../middleware/auth')

const router = require('express').Router();
const { login, postLogin  } = require('../controller/admin/authController')
const { home } = require('../controller/admin/homeController')
const { bazar } = require('../controller/admin/bazarController')

router.get('/', auth, home)
router.get('/login', login)
router.post('/login', postLogin)

router.post('/bazar', bazar)

module.exports = router;