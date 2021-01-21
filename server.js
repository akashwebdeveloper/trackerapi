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
var admin = require("firebase-admin")





// Database connection
const connectDB = require('./config/db');
connectDB();



// Twilio Config
const twilioInit = require('./controller/auth/phoneController')
twilioInit(client)


// Body parser middleware
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


// // Assets
app.use(express.static('public'))
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())


// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


app.use('/', require('./routers/api'))
app.use('/admin', require('./routers/web'))

app.listen(port, ()=> console.log(`Connected to port ${port}`))