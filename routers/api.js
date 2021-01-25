const router = require('express').Router();
const { signup, phone, verify, register, register1 } = require('../controller/auth/phoneController')

const { oneUser, multiUser } = require('../controller/notify')
const { getdata, update} = require('../controller/users/users')
const { updatephoto, upload } = require('../controller/photos/profilephoto')

// Phone OTP verification
router.get('/phone/', phone)
router.get('/verify/', verify)

// Insert data into database
router.post('/signup', signup)

// get data from database
router.post('/getinfo', getdata)

// router.post('/oneuser', oneUser)
// router.post('/multiuser', multiUser)


// if number is register then send otp
router.post('/register', register)
router.post('/register1', register1)


// Update user data
router.post('/updateprofile', update)
router.post('/updatephoto', upload.single('photos'), updatephoto)









module.exports = router;