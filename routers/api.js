const router = require('express').Router();
const { signup } = require('../controller/auth/phoneController')
// const { signup, phone, verify, register, register1, resendotp } = require('../controller/auth/phoneController')

const { oneUser } = require('../controller/notify')
// const { oneUser, multiUser } = require('../controller/notify')
const { getalldata, getdata, update, emailverification, getAllUsername, syncNumber, getSyncNumber, deleteSyncNumber, coinDetails, realCoinDetails, friendsRanking, searchUserData} = require('../controller/users/users')
const { follow, unfollow } = require('../controller/users/followController')
const { updatephoto, upload } = require('../controller/photos/profilephoto')
const { free, appexclusive, accessories, apparel, electronics, food_beverage, footwear, health_wellness, jewellery, personalcare, sleepsolution, subscription, others } = require('../controller/bazar/bannerController')
const { addbookmark, removebookmark, bookmarklist } = require('../controller/bazar/bookmarkController')
const { like, unlike } = require('../controller/bazar/likeController')
const { setPrivate } = require('../controller/users/setting')
const { order, paymentCapture } = require('../controller/razor_pay/razorPayController')
const { addsEarning, adsCounter } = require('../controller/bazar/adds')
const { productfullview, details } = require('../controller/bazar/fullviewController')
const { testing, todayprogress, updates, progressgraph,weeklyProgressGraph, totalstep, challengeStepUpdate, getActivity, reaction} = require('../controller/users/steps')
const { getAllChallenges, challengedetails, joinchallenge, userChallenges, challengeRanking } = require('../controller/users/challenges')

// Phone OTP verification
// router.get('/phone/', phone)
// router.get('/verify/', verify)
// router.get('/resendotp/', resendotp)

// Insert data into database
router.post('/signup', signup)

// get data from database
router.post('/getinfo', getdata)
router.post('/getsearchuserinfo', searchUserData)
router.get('/getalluser', getalldata)
router.post('/searchusername', getAllUsername)

// Sync Contacts
router.post('/syncnumber', syncNumber)
router.post('/getsyncnumber', getSyncNumber)
router.post('/deletesyncnumber', deleteSyncNumber)

// Friends Activitty
router.post('/friendsranking', friendsRanking)

router.post('/oneuser', oneUser)
// router.post('/multiuser', multiUser)


// if number is register then send otp
// router.post('/register', register)


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

// steps data
router.post('/todayprogress', todayprogress)
// Updating Step graph
router.post('/updates', updates)
router.post('/progressgraph', progressgraph)
router.post('/weeklyprogressgraph', weeklyProgressGraph)

// total step & average step
router.post('/totalstep', totalstep)

// All Activity List
router.post('/activity', getActivity)
// Sending reaction to activity
router.post('/reaction', reaction)

// Coin All transactions details
router.post('/coindetails', coinDetails)

// Real Coin All transactions details
router.post('/realcoindetails', realCoinDetails)

// Changing Private Account
router.post('/setprivate', setPrivate)

// Challenges
router.get('/challenges', getAllChallenges)
router.post('/challengedetails', challengedetails)
router.post('/joinchallenge', joinchallenge)
router.post('/userchallenge', userChallenges)
router.post('/challengeranking', challengeRanking)

// Earning By Adding Adds
router.post('/addsearning', addsEarning)
router.post('/adscounter', adsCounter)


// Payment
router.post('/order', order)
router.post('/paymentcapture', paymentCapture)

router.post('/testing', testing)


module.exports = router;