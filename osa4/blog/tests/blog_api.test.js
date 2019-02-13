const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = helper.startingBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

describe('API tests', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.startingBlogs.length)
  })

  test('test for id instead of _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]._id).toBeUndefined()
    expect(response.body[0].id).toBeDefined()
  })

  test('adding blog works', async () => {
    const newBlog = new Blog({
      title: 'uusi',
      author: 'minä',
      url: 'jotain.com',
    })

    const inDBBefore = await helper.blogsInDB()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const inDBAfter = await helper.blogsInDB()

    expect(inDBAfter.length).toBe(inDBBefore.length + 1)
  })

  test('default likes is zero', async () => {
    const newBlog = new Blog({
      title: 'uusi',
      author: 'minä',
      url: 'jotain.com',
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const inDB = await helper.blogsInDB()
    const addedBlog = inDB.filter(blog => blog.author === newBlog.author)[0]

    expect(addedBlog.likes).toBe(0)
  })

  test('API responds accordingly to missing title and url', async () => {
    const newBlog = new Blog({
      author: 'minä',
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('API responds accordingly to missing url', async () => {
    const newBlog = new Blog({
      title: 'uusi',
      author: 'minä',
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('API responds accordingly to missing title', async () => {
    const newBlog = new Blog({
      author: 'minä',
      url: 'jotain.com',
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
