import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [infoMessage, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">lisää blogi</button>
    </form>
  )

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
      likes: 0,
    }

    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setInfoMessage({ mes: `blogi "${title}" lisätty`, class: 'success' })
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
      setInfoMessage({ mes: `${username} Kirjauduttu ulos!`, class: 'success' })
    } catch (err) {
      setInfoMessage({ mes: 'Ulos kirjautuminen epäonnistui', class: 'error' })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setInfoMessage({ mes: `${username} kirjautui sisään!`, class: 'success' })
    } catch (exception) {
      setInfoMessage({ mes: 'käyttäjätunnus tai salasana virheellinen', class: 'error' })
    }
  }

  const setInfoMessage = (message) => {
    setMessage({ mes: message.mes, class: message.class })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={message.class}>
        {message.mes}
      </div>
    )
  }

  const handleLike = async (blog) => {
    const updatedBlog = await blogService.update(blog)
    let updatedBlogList = blogs.filter(blog => blog.id !== updatedBlog.id)
    updatedBlogList = updatedBlogList.concat(updatedBlog)
    setBlogs(updatedBlogList)
  }

  const handleDelete = async (blog) => {
    const res = await blogService.remove(blog)
    if( res.status === 204 ) {
      let updatedBlogList = blogs.filter(b => b.id !== blog.id)
      setBlogs(updatedBlogList)
    } else {
      setInfoMessage({ mes: 'poisto epäonnistui', class: 'error' })
    }
  }

  return (
    <div>
      <Notification message={infoMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button type="logout" onClick={handleLogout}>kirjaudu ulos</button>
          <Togglable buttonLabel="new blog">
            {blogForm()}
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
          )}
        </div>
      }
    </div>
  )
}

export default App