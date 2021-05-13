const mongoose = require('mongoose')
let OrderSchema = new mongoose.Schema({
  order_label: String,
  origin: String,
  destination: String,
  receiver_name: String,
  receiver_phone: String,
  receiver_address: String,
  sender_name: String,
  sender_phone: String,
  booking_date: String,
  scheduled_date: String,
  delivery_date: String,
  remark: String,
  weight: Number,
  length: Number,
  breadth: Number,
  height: Number,
  status: ['In-Transit', 'Delivered', 'Cancelled', 'Ready-For-Pickup'],
  locations: [ String ],
  item_type: String,
})

module.exports = mongoose.model('order', OrderSchema)