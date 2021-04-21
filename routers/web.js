const {auth} = require('../middleware/auth')
const {guest} = require('../middleware/guest')

const router = require('express').Router();
const { login, postLogin, logout  } = require('../controller/admin/authController')
const { home } = require('../controller/admin/homeController')
const { usertable } = require('../controller/admin/userController')
const { getFAQForm, addFAQ } = require('../controller/admin/settingController')
const { getreferralform, updatereferral } = require('../controller/admin/formController')
const { getchallengeform, createchallenge, updatechallenge, challengetable, getcategoryform, addCategory, deleteCategory } = require('../controller/admin/formController')
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


router.get('/updatebazar/:id',auth, updatebazarform)
router.post('/updatebazar',upload, updatebazar)

// Referral 
router.get('/referral',auth, getreferralform)
router.post('/updatereferral', updatereferral)

// Referral 
router.get('/category',auth, getcategoryform)
router.post('/addcategory', addCategory)
router.get('/deletecategory/:id/:category', deleteCategory)

// Challenge 
router.get('/challenge',auth, getchallengeform)
router.post('/createchallenge', createchallenge)
router.post('/updatechallenge', updatechallenge)

// Tables
router.get('/bazartable',auth, bazartable)
router.get('/usertable',auth, usertable)
router.get('/challengetable',auth, challengetable)
// router.get('/bazartable', bazartable)


// Settings
router.get('/getfaqform',auth, getFAQForm)
router.post('/addfaq', addFAQ)



router.get('/deletebazar/:id',upload, deletebazar)
module.exports = router;