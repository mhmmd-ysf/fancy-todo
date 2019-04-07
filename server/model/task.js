const mongoose = require('mongoose')

let TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  checkStatus: Boolean,
  dueDate: Date,
  userId: String
})

let Task = mongoose.model('Task', TaskSchema)

module.exports = Task