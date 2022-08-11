const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const router = express.Router();
const Users = require("./users-model")
const Posts = require("../posts/posts-model")
const {logger, validateUserId, validateUser} = require("../middleware/middleware")

router.use(logger)

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then((result) => {
    res.status(200).json(result)
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
    res.status(200).json(req.userIdValidated)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.bodyNameUserValidated)
    .then((item) => {
      return Users.getById(item.id)
    })
    .then((result) => {
      res.status(201).json(result)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.bodyNameUserValidated)
  .then((result) => {
    res.status(200).json(result)
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
    Users.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.userIdValidated)
    })
  })

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then((result) => {
    res.status(200).json(result)
  })
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router