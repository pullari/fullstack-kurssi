const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((cur, blog) => cur + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((fav, cur) => fav.likes > cur.likes ? fav : cur)

const mostBlogs = (blogs) => {
  let mostBloggingAuthor = ''

  const blogCounts = _.groupBy(blogs, 'author')
  const mostBlogs = _.reduce(blogCounts, (most, cur, key) => {
    mostBloggingAuthor = key
    return most.length > cur.length ? most : cur
  }, [])

  return { author: mostBloggingAuthor, blogs: mostBlogs.length }
}

const mostLikes = (blogs) => {
  let mostLikedAuthor = { author: '', likes: 0 }

  const blogByAuthor = _.groupBy(blogs, 'author')
  _.forEach(blogByAuthor, (val, key) => {
    const likes = _.reduce(val, (sum, cur) => sum + cur.likes, 0)
    if(likes >= mostLikedAuthor.likes) mostLikedAuthor = { author: key, likes }
  })

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}