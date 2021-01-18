const router = require('express').Router();
const { signup, phone, verify } = require('../controller/auth/phoneController')

const { oneUser, multiUser } = require('../controller/notify')
const { getdata } = require('../controller/users/users')



// Phone OTP verification
router.get('/phone/', phone)
router.get('/verify/', verify)

// Insert data inti database
router.post('/signup', signup)

router.post('/getinfo', getdata)

router.post('/oneuser', oneUser)
// router.post('/multiuser', multiUser)





module.exports = router;