const router = require('express').Router();
const { signup, phone, verify, register, register1, resendotp } = require('../controller/auth/phoneController')

const { oneUser, multiUser } = require('../controller/notify')
const { getalldata, getdata, update, emailverification} = require('../controller/users/users')
const { follow, unfollow } = require('../controller/users/followController')
const { updatephoto, upload } = require('../controller/photos/profilephoto')
const { free, appexclusive, accessories, apparel, electronics, food_beverage, footwear, health_wellness, jewellery, personalcare, sleepsolution, subscription, others } = require('../controller/bazar/bannerController')
const { addbookmark, removebookmark, bookmarklist } = require('../controller/bazar/bookmarkController')
const { like, unlike } = require('../controller/bazar/likeController')
const { productfullview, details } = require('../controller/bazar/fullviewController')

// Phone OTP verification
router.get('/phone/', phone)
router.get('/verify/', verify)
router.get('/resendotp/', resendotp)

// Insert data into database
router.post('/signup', signup)

// get data from database
router.post('/getinfo', getdata)
router.get('/getalluser', getalldata)

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
router.post('/bannerfree', free)
router.post('/bannerappexclusive', appexclusive)
router.post('/banneraccessories', accessories)
router.post('/bannerapparel', apparel)
router.post('/bannerelectronics', electronics)
router.post('/bannerfood_beverage', food_beverage)
router.post('/bannerfootwear', footwear)
router.post('/bannerhealth_wellness', health_wellness)
router.post('/bannerjewellery', jewellery)
router.post('/bannerpersonalcare', personalcare)
router.post('/bannersleepsolution', sleepsolution)
router.post('/bannersubscription', subscription)
router.post('/bannerothers', others)


// Banner Full view data
router.post('/productinfo', productfullview)

// Company details
router.post('/companyinfo', details)

// Bookmarks
router.post('/addbookmark', addbookmark)
router.post('/removebookmark', removebookmark)
router.post('/bookmarklist', bookmarklist)

// Likes
router.post('/like', like)
router.post('/unlike', unlike)

// Follow & follwers
router.post('/follow', follow)
router.post('/unfollow', unfollow)

module.exports = router;