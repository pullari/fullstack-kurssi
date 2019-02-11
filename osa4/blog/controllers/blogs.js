const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', (req, res, next) => {
  Blog.find({})
    .then(blogs => res.json(blogs))
    .catch(err => {
      console.log(err)
      next(err)
    })
})

router.post('/', (req, res, next) => {
  new Blog(req.body)
    .save()
    .then(saved => res.status(201).json(saved))
    .catch(err => next(err))
})

module.exports = router