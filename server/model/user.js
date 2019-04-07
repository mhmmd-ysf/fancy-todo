const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  tasks: []
})

let User = mongoose.model('User', userSchema)

module.exports = User