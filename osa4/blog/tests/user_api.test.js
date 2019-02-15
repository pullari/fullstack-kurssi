const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

beforeAll(async () => {
  await User.remove({})
})

describe('User api tests', () => {

  test('Creating new user works', async () => {
    const newUser = {
      name: 'joku',
      username: 'jokuhienonimi',
      password: 'tarpeeksi'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDB()
    const addedUser = users.filter(user => user.username === newUser.username)[0]

    expect(addedUser).toBeDefined()
  })

  test('Creating new user with too small username', async () => {
    const newUser = {
      name: 'joku',
      username: 'jo',
      password: 'tarpeeksi'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.text).toContain('User validation failed')
  })

  test('Creating new user with too small password', async () => {
    const newUser = {
      name: 'joku',
      username: 'jokutoimiva',
      password: 'ta'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.text).toContain('Password needs to be atleast 3 characters long')
  })

})

afterAll(() => {
  mongoose.connection.close()
})