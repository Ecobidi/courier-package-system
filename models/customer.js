const mongoose = require('mongoose')

let CustomerSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  other_names: String,
  phone: String,
  address: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
})

module.exports = mongoose.model('customer', CustomerSchema)