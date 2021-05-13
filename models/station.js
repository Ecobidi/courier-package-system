const mongoose = require('mongoose')

let StationSchema = new mongoose.Schema({
  station_name: String,
  address: String,
  state: String,
  phone: String,
  email: String,
})

module.exports = mongoose.model('station', StationSchema)