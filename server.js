require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const request = require('request');
const port = process.env.PORT
const accountSID = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSID, authToken)

var admin = require("firebase-admin");





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
// app.use(express.static('public'))
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())



app.use('/', require('./routers/api'))

app.listen(port, ()=> console.log(`Connected to port ${port}`))