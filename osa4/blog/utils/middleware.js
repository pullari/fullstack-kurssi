const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name !== undefined) {
    res.status(500).json({ error: error.message })
  }
  next(error)
}

const extractToken = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) req.token = authorization.substring(7)
  next()
}

module.exports = {
  errorHandler, extractToken
}