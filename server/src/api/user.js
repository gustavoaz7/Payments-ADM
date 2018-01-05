const restful = require('node-restful')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, min: 6}
})

module.exports = restful.model('User', userSchema)