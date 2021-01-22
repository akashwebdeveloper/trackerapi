const router = require('express').Router();
const { signup, phone, verify, register } = require('../controller/auth/phoneController')

const { oneUser, multiUser } = require('../controller/notify')
const { getdata, update} = require('../controller/users/users')
const { updatephoto } = require('../controller/photos/profilephoto')

const { upload } = require('../controller/photos/profilephoto')

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

router.post('/update', update)

// Update user data
router.post('/updatephoto', upload.single('photos'), updatephoto)









module.exports = router;