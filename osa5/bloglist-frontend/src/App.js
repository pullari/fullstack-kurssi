import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [infoMessage, setMessage] = useState(null)

  const { reset: userReset, ...usernameField } = useField('text')
  const { reset: passwordReset, ...passwordField }   = useField('password')

  const { reset: titleReset, ...titleField } = useField('text')
  const { reset: authorReset, ...authorField }   = useField('text')
  const { reset: urlReset, ...urlField }   = useField('text')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div>käyttäjätunnus
          <input name="username" {...usernameField}/>
        </div>
        <div>salasana
          <input name="Password" {...passwordField}/>
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>title
        <input name="Title" {...titleField}/>
      </div>
      <div>author
        <input name="Author" {...authorField}/>
      </div>
      <div>url
        <input name="Url" {...urlField}/>
      </div>
      <button type="submit">lisää blogi</button>
    </form>
  )

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
      likes: 0,
    }

    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    titleReset()
    authorReset()
    urlReset()
    setInfoMessage({ mes: `blogi "${titleField.value}" lisätty`, class: 'success' })
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
      setInfoMessage({ mes: `${usernameField.value} Kirjauduttu ulos!`, class: 'success' })
    } catch (err) {
      setInfoMessage({ mes: 'Ulos kirjautuminen epäonnistui', class: 'error' })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = usernameField.value
    const password = passwordField.value
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      userReset()
      passwordReset()
      setInfoMessage({ mes: `${usernameField.value} kirjautui sisään!`, class: 'success' })
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