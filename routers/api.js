const router = require('express').Router();
const { signup, phone, verify } = require('../controller/auth/phoneController')

const { oneUser, multiUser } = require('../controller/notify')
const { getdata } = require('../controller/users/users')




router.get('/phone/', phone)
router.get('/verify/', verify)
router.post('/signup', signup)


router.post('/oneuser', oneUser)
router.post('/getinfo', getdata)
// router.post('/multiuser', multiUser)


module.exports = router;