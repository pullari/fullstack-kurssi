const Blog = require('../models/blog')
const User = require('../models/user')

const startingBlogs = [
  {
    title: 'HTML on helppoa',
    author: 'pertti',
    url: 'jotain.com',
    likes: 4
  },
  {
    title: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    author: 'samuli',
    url: 'jotain.com',
    likes: 7
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'ylimääräinen',
    author: 'joku',
    url: 'jotain.com',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  startingBlogs, nonExistingId, blogsInDB, usersInDB
}