const router = require('express').Router();
const { login } = require('../controller/admin/authController')
const { home } = require('../controller/admin/homeController')

router.get('/login', login)
router.get('/', home)

module.exports = router;