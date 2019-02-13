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

  const newBlog = new Blog({
    ...req.body,
    likes: req.body.likes ? req.body.likes : 0
  })

  newBlog
    .save()
    .then(saved => res.status(201).json(saved))
    .catch(err => next(err))
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { author, title, likes, url } = req.body
    const newBlog = { author, title, likes, url }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
    res.json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = router