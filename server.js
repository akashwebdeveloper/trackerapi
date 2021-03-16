require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const request = require('request');
const path = require('path')
const port = process.env.PORT
const accountSID = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSID, authToken)
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
var admin = require("firebase-admin")
var favicon = require('serve-favicon');


// Favicon
app.use(favicon(__dirname + '/public/img/favicon.ico'));


// Database connection
const connectDB = require('./config/db');
connectDB();



// Twilio Config
const twilioInit = require('./controller/auth/phoneController')
twilioInit(client)



app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
    // cookie: { maxAge: 1000 * 15 } // 15minute
}))


// Passport config
const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Body parser middleware
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Assets
app.use('/profilephoto', express.static('profilephoto'));
app.use('/bazarphoto', express.static('bazarphoto'));
app.use(express.static('public'));


// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')



// routes
app.use('/', require('./routers/api'))
app.use('/admin', require('./routers/web'))

app.listen(port, ()=> console.log(`Connected to port ${port}`))