require('dotenv').config()
const serviceID = process.env.SERVICE_ID
const Admin = require('../../models/admin')
const User = require('../../models/user')

const referralCodeGenerator = require('referral-code-generator')


function init(client) {
    module.exports = {
        signup(req, res) {
            const { type, fname, lname, username, dob, countrycode, phone, email, gender, weight, height, token, photos, referrercode } = req.body

            User.findOne({ $or: [{ phone: phone }, { email: email }] }, (err, users) => {
                // User.findOne({ email: email }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (users) {
                    return res.status(202).json({
                        success: false,
                        status: 202,
                        message: "user Already exist",
                        user: [users]
                    })
                }
                const user = new User({
                    type: type || "",
                    fname: fname || "",
                    lname: lname || "",
                    username: username || "",
                    dob: dob || "",
                    gender: gender || "",
                    email: email || "",
                    photos: photos || "",
                    weight: weight || "",
                    height: height || "",
                    countrycode: countrycode || "",
                    phone: phone || "",
                    token: token || "",
                    referralcode: referralCodeGenerator.custom('uppercase', 4, 5, username)
                })
                // New User Save to database
                user.save().then(user => {
                    if (referrercode) {
                        Admin.find({}, (err, result) => { 
                            User.updateOne({ referralcode: referrercode }, { $inc: { coin: result[0].referral }}, (err, result)=>{
                                if (err)  throw err;
                            })
                         })
                    }

                    return res.status(200).json({
                        success: true,
                        status: 200,
                        message: "verfied data save in to database",
                        user: [user]
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
        register(req, res) {
            const { countryCode, phone } = req.body

            // User.findOne({ $or: [{ phone: phone }, { email: email }] }, (err, users) => {
            User.findOne({ phone: phone }, (err, users) => {
                if (err) {
                    return res.status(502).json({
                        success: false,
                        status: 502,
                        message: "err from database"
                    })
                }

                if (users) {
                    client
                        .verify
                        .services(serviceID)
                        .verifications
                        .create({
                            to: `+${countryCode}${phone}`,
                            channel: "sms"
                        })
                        .then((data) => {
                            return res.status(200).json({
                                success: true,
                                message: "please check your mobile Number for otp verification",
                                status: 200,
                                user: [users]
                            })
                        }).catch((err) => {
                            res.json({
                                success: false,
                                message: "please Enter correct country code/ mobile number",
                                status: 404,
                                err
                            })
                        })
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Mobile number is not registered",
                    })
                }
            })
        },
        phone(req, res) {
            const { phone, country } = req.query

            console.log(`+${country}${phone}`)
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
                        success: true,
                        message: "please check your mobile Number for otp verification",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(503).json({
                        success: false,
                        message: "please Enter correct country code/ mobile number",
                        status: 503,
                        err
                    })
                })
        },
        verify(req, res) {

            const { phone, country, code } = req.query

            if (!code || code.length != '4') {
                return res.status(400).json({
                    message: "can't go ahead without enter correct OTP and OTP should four digit",
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
                .then(verification_check => {
                    if (verification_check.status === 'pending') {
                        return res.status(500).json({
                            success: false,
                            status: 500,
                            message: "Code is wrong please Enter again"
                        })
                    }
                    // // genrate Token
                    // client.verify.services(serviceID)
                    //     .accessTokens
                    //     .create({ identity: 'identity', factorType: 'push' })
                    //     .then(access_token => {
                    //         const token = access_token.token
                    //         // console.log(access_token.token)
                    //         User.findOne({ phone: phone }, (err, user) => {
                    //             if (err) {
                    //                 return res.status(502).json({
                    //                     success: false,
                    //                     status: 502,
                    //                     messsage: "err from database"
                    //                 })
                    //             }

                    //             if (user) {
                    //                 return res.status(200).json({
                    //                     success: true,
                    //                     status: 200,
                    //                     messsage: "Number verified successfully",
                    //                     userdata: user,
                    //                     token
                    //                 })
                    //             } else {
                    //                 return res.status(200).json({
                    //                     success: 1,
                    //                     status: 200,
                    //                     message: "Number verified successfully Now Create Account",
                    //                     countryCode: country,
                    //                     phone
                    //                 })
                    //             }
                    //         })
                    //     });
                    // console.log(data)
                    // return res.status(200).json({
                    //     success: 1,
                    //     status: 200,
                    //     message: "Number verified successfully Now Create Account",
                    //     countryCode: country,
                    //     phone
                    // })
                    console.log(verification_check.status)

                    User.find({ phone: phone }, (err, data) => {
                        if (err) {
                            return res.status(502).json({
                                success: false,
                                status: 502,
                                message: "err from database"
                            })
                        }

                        if (data) {
                            return res.status(200).json({
                                success: true,
                                status: 200,
                                message: "Number verified successfully",
                                countryCode: country,
                                phone,
                                user: data[0]
                            })
                        }

                        return res.status(200).json({
                            success: true,
                            status: 200,
                            message: "Number is New",
                            countryCode: country,
                            phone,
                            user: data
                        })
                    })



                }).catch((err) => {
                    res.status(202).json({
                        success: false,
                        message: "wrong OTP please enter correct OTP",
                        status: 202,
                        err
                    })
                })
        },
        resendotp(req, res) {
            const { phone, country } = req.query

            console.log(`+${country}${phone}`)
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
                        success: true,
                        message: "please check your mobile Number for otp verification",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(503).json({
                        success: false,
                        message: "please Enter correct country code/ mobile number",
                        status: 503,
                        err
                    })
                })
        },
    }
}



module.exports = init