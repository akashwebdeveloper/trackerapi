const {auth} = require('../middleware/auth')

const router = require('express').Router();
const { login, postLogin  } = require('../controller/admin/authController')
const { home } = require('../controller/admin/homeController')
const { bazar, updatebazar, deletebazar, upload, } = require('../controller/admin/bazarController')

router.get('/', auth, home)
router.get('/login', login)
router.post('/login', postLogin)

router.post('/bazar',upload, bazar)


router.post('/updatebazar',upload, updatebazar)


router.post('/deletebazar',upload, deletebazar)
module.exports = router;