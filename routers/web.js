const {auth} = require('../middleware/auth')
const {guest} = require('../middleware/guest')

const router = require('express').Router();
const { login, postLogin, logout  } = require('../controller/admin/authController')
const { home } = require('../controller/admin/homeController')
const { getbazarform, bazar, updatebazar, deletebazar, bazartable, updatebazarform, upload, } = require('../controller/admin/bazarController')

router.get('/', auth, home)
// router.get('/', home)
router.get('/login',guest , login)
// router.get('/login', login)
router.post('/login', postLogin)
router.post('/logout', logout)

router.get('/bazar',auth, getbazarform)
// router.get('/bazar', getbazarform)
router.post('/bazar',upload, bazar)

router.get('/updatebazar/:id', updatebazarform)
router.post('/updatebazar',upload, updatebazar)


// Tables
router.get('/bazartable',auth, bazartable)
// router.get('/bazartable', bazartable)


router.get('/deletebazar/:id',upload, deletebazar)
module.exports = router;