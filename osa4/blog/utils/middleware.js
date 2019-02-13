const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name !== undefined) {
    res.status(500).json({ 'error': error.message })
  }
  next(error)
}

module.exports = {
  errorHandler
}