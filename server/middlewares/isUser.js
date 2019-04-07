const { Task } = require('../model')
const { User } = require('../model')

function isUser(req, res, next) {
  console.log(req.body, 'req body, userid')
  console.log(req.params, 'req params, taskid')

  Task.find({_id: req.params.id})
    .then(task => {
      task = task[0]
      console.log(task.userId)
      console.log(task)
      if(task.userId !== req.body.id || !task.userId) res.status(401).json({message: 'Harus Admin/user sendiri.'})
      else next()
    })
    .catch(err => {console.log('error'); res.status(500).json({message: err.message})})
  // try {
  //   if(req.auth.role !== 'admin') {
  //     if(req.params.id == req.auth.id) {
  //       next()
  //     } else {
  //       res.status(401).json({message: 'Harus Admin/user sendiri.'})
  //     }
  //   } else {
  //     next()
  //   }
  // } catch {
  //   res.status(401).json({message: 'Harus authorized user'})
  // }
}

module.exports = isUser