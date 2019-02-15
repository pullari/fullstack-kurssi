const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { username, password, name } = req.body
    const saltRounds = 10

    if(!validatePassword(password)) throw { name:'ValidationError', message: 'Password needs to be atleast 3 characters long' }

    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      passwordHash,
      name
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

const validatePassword = (password) => password && password.length >= 3

module.exports = router