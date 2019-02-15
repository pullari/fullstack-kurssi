const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', (req, res, next) => {
  Blog.find({}).populate('user')
    .then(blogs => res.json(blogs))
    .catch(err => {
      console.log(err)
      next(err)
    })
})

router.post('/', async (req, res, next) => {
  const decodedToken = verifyToken(req.token, res)
  const poster = await User.findById(decodedToken.id)

  const newBlog = new Blog({
    ...req.body,
    user: poster.id,
    likes: req.body.likes ? req.body.likes : 0
  })

  try {
    const saved = await newBlog.save()

    poster.blogs = poster.blogs.concat(saved)
    await poster.save()

    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = verifyToken(req.token, res)
    const blog = await Blog.findById(req.params.id)

    if(blog.user.toString() !== decodedToken.id.toString()) {
      res.status(401).json({ error: 'Can\'t remove others blogs' })
    }

    await blog.delete()
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

const verifyToken = (token, res) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  } else {
    return decodedToken
  }
} 

module.exports = router