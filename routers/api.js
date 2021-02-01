const router = require('express').Router();
const { signup, phone, verify, register, register1 } = require('../controller/auth/phoneController')

const { oneUser, multiUser } = require('../controller/notify')
const { getdata, update, emailverification} = require('../controller/users/users')
const { updatephoto, upload } = require('../controller/photos/profilephoto')
const { free, appexclusive, accessories, apparel, electronics, food_beverage, footwear, health_wellness, jewellery, personalcare, sleepsolution, subscription, others } = require('../controller/bazar/bannerController')

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

// just for testing
router.post('/emailverification', emailverification)





// Banner data getting
router.get('/bannerfree', free)
router.get('/bannerappexclusive', appexclusive)
router.get('/banneraccessories', accessories)
router.get('/bannerapparel', apparel)
router.get('/bannerelectronics', electronics)
router.get('/bannerfood_beverage', food_beverage)
router.get('/bannerfootwear', footwear)
router.get('/bannerhealth_wellness', health_wellness)
router.get('/bannerjewellery', jewellery)
router.get('/bannerpersonalcare', personalcare)
router.get('/bannersleepsolution', sleepsolution)
router.get('/bannersubscription', subscription)
router.get('/bannerothers', others)




module.exports = router;