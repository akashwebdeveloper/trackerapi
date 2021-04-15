require('dotenv').config()
const request = require('request');
const Razorpay = require('razorpay');
const keyId = process.env.RAZOR_PAY_KEY_ID
const secretKey = process.env.RAZOR_PAY_SECRET
const Order = require('../../models/order')
var instance = new Razorpay({
    key_id: keyId,
    key_secret: secretKey,
});
module.exports = {
    order: (req, res) => {

        const { uid, order_ammount } = req.body
        var order_length = 0;
        Order.find({}, async (err, result) => {
            if (err) throw err;
            await (result.length) ? order_length = result.length + 1 : order_length = 1

            try {

                var options = {
                    amount: order_ammount * 100,   // amount in the smallest currency unit  
                    currency: "INR",
                    receipt: `UBS_money_${order_length}`,
                    payment_capture: 0
                };

                instance.orders.create(options, function (err, order) {
                    if (err) {
                        return res.status(500).json({
                            message: "something error!s 1"
                        })
                    }


                    const newOrder = new Order({
                        order_id: order.id,
                        receipt: order.receipt,
                        order_ammount: order.amount,
                        user_id: uid,
                        status: order.status
                    })

                    newOrder.save().then(data => {
                        return res.status(200).json(order)
                    })
                });
            } catch (err) {
                return res.status(500).json({
                    message: "something error!s 3"
                })
            }
        })
    },
    paymentCapture: (req, res) => {

        const { paymentId, ammount } = req.body
        
        instance.payments.capture(paymentId, ammount, 'INR', (err) => {
            if (err) {
                return res.status(400).json({
                    success: false
                })
            }
            return res.status(200).json({
                success: true
            })
        })
    },

}