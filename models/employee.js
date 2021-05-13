const mongoose = require('mongoose')

let EmployeeSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  other_names: {
    type: String,
  },
  surname: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  email: String,
  phone: String,
  role: {
    type: String,
    default: 'employee',
  },
  photo: {
    type: String,
  }
})

module.exports = mongoose.model('employee', EmployeeSchema)