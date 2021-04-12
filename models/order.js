const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema

const orderSchema = new Schema({
    order_id: { type: String },
    receipt: { type: String },
    status: { type: String },
    order_ammount: { type: Number },
    user_id:{type: ObjectId, ref:"User"},
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema)