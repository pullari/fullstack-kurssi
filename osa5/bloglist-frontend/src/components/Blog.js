import React, { useState }  from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={ { border: 'solid 1px' } }>
      <div onClick={toggleVisibility}>
        {blog.title}
      </div>
      <div style={showWhenVisible}>
        <div>Author: {blog.author}</div>
        <div>URI: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={() => handleLike({ ...blog, likes: blog.likes + 1 })}>Like</button>
        </div>
        <button onClick={() => handleDelete(blog)}>Remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog