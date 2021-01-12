require('dotenv').config()

const serviceID = process.env.SERVICE_ID
const User = require('../../models/user')



function init(client) {
    module.exports = {
        signup(req, res) {
            const { type, fname, lname, username, dob, countrycode, phone, email, gender, weight, height, token, photos } = req.body

            User.findOne({ $or: [ { phone: phone }, { email: email } ] }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: "0",
                        status:502,
                        messsage: "err from database"
                    })
                }

                if (users) {
                    return res.status(403).json({
                        success: "0",
                        status:403,
                        messsage: "user Already exist",
                        user: users
                    })
                }
                const user = new User({
                    type: type|| "",
                    fname: fname|| "",
                    lname: lname|| "",
                    username: username|| "",
                    dob: dob|| "",
                    gender: gender|| "",
                    email: email || "",
                    photos: photos || "",
                    weight: weight|| "",
                    height: height|| "",
                    countrycode: countrycode|| "",
                    phone: phone|| "",
                    token: token|| "",
                })
                // New User Save to database
                user.save().then(user => {
                    // login
                    return res.status(200).json({
                        success: 1,
                        status: 200,
                        message: "verfied data save in to database",
                        data: user,
                    })
                }).catch(err => {
                    return res.status(503).json({
                        success: 0,
                        status: 503,
                        message: "err from database",
                        err
                    })
                })
            })
        },
        phone(req, res) {
            const { phone, country } = req.query

            client
                .verify
                .services(serviceID)
                .verifications
                .create({
                    to: `+${country}${phone}`,
                    channel: "sms"
                })
                .then((data) => {
                    res.status(200).json({
                        message: "go to url and enter otp",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(503).json({
                        message: "please Enter correct country code/ mobile number",
                        status: 503,
                        err
                    })
                })
        },
        verify(req, res) {

            const { phone, country, code } = req.query

            if (!code) {
                res.status(400).json({
                    message: "can't go ahead without enter correct code",
                    status: 400,
                })
            }
            client
                .verify
                .services(serviceID)
                .verificationChecks
                .create({
                    to: `+${country}${phone}`,
                    code: code
                })
                .then((data) => {

                    // genrate Token
                    client.verify.services(serviceID)
                        .accessTokens
                        .create({ identity: 'identity', factorType: 'push' })
                        .then(access_token => {
                            const token = access_token.token
                            // console.log(access_token.token)
                            User.findOne({ phone: phone }, (err, user) => {
                                if (err) {
                                    return res.status(502).json({
                                        success: "0",
                                        status: 502,
                                        messsage: "err from database"
                                    })
                                }

                                if (user) {
                                    return res.status(200).json({
                                        success: "1",
                                        status: 200,
                                        messsage: "Number verified successfully",
                                        userdata: user,
                                        token
                                    })
                                } else {
                                    return res.status(200).json({
                                        success: 1,
                                        status: 200,
                                        message: "Number verified successfully Now Create Account",
                                        countryCode: country,
                                        phone
                                    })
                                }
                            })
                        });
                }).catch((err) => {
                    res.status(500).json({
                        status: 500,
                        message: "Code is wrong please Enter again"
                    })
                })
        }

    }
}



module.exports = init