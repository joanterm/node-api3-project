const Users = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.baseUrl, new Date())
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Users.getById(req.params.id)
  .then((result) => {
    if(!result) {
      res.status(404).json({message: "user not found"})
      return
    }
    req.userIdValidated = result
    next()
  })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
    res.status(400).json({message: "missing required name field"})
    return
  }
  req.bodyNameUserValidated = {name: req.body.name.trim()}
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser
}