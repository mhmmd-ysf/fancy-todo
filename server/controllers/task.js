const {Task} = require('../model')

class ControllerTask {
  static create(req, res) {
    let input = req.body
    let newTask = {
      name: input.name,
      description: input.description,
      checkStatus: false,
      dueDate: input.dueDate
    }
    Task.create(newTask)
    .then(data => {res.status(201).json(data)})
    .catch(err => {res.status(500).json(err)})
  }
  static findAll(req, res) {
    Task.find()
    .then(data => {res.status(200).json(data)})
    .catch(err => {res.status(500).json(err)})
  }
  static update(req, res) {
    Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json(err))
  }
  static delete(req, res) {
    Task.findOneAndDelete({_id: req.params.id})
    .then(task => {
      const response = {
        message: 'Successfully deleted task.',
        id: req.params.id
      }
      res.status(200).json(task)
    })
    .catch(err => res.status(500).json(err))
  }
}

module.exports = ControllerTask