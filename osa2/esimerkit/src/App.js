import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import noteService from './services/notes'
import Togglable from './components/Togglable'
import loginService from './services/login' 

const App = (props) => {  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('uusi muistiinpano...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = React.createRef()

  useEffect(() => {
    noteService      
      .getAll()      
      .then(initialNotes => {        
        setNotes(initialNotes)    
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll    
    ? notes    
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = id => {    
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService      
      .update(id, changedNote)      
      .then(returnedNote => {        
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))   
      })
      .catch(error => {      
        setErrorMessage(
          `muistiinpano '${note.content}' poistettu palvelimelta`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))    
      })
  }

  const rows = () => notesToShow.map(note =>
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
  )

  const handleNoteChange = (event) => {   
    console.log(event.target.value)    
    setNewNote(event.target.value)  
  }

  const addNote = (event) => {
    event.preventDefault()
    noteFormRef.current.toggleVisibility()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService      
      .create(noteObject)      
      .then(returnedNote => {        
        setNotes(notes.concat(returnedNote))   
        setNewNote('')      
      })
    setNewNote('')
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const NoteForm = ({ onSubmit, handleChange, value}) => {
    return (
      <div>
        <h2>Luo uusi muistiinpano</h2>
  
        <form onSubmit={onSubmit}>
          <input
            value={value}
            onChange={handleChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <Notification message={errorMessage} />

      <h2>Kirjaudu!</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm
              onSubmit={addNote}
              value={newNote}
              handleChange={handleNoteChange}
            />
          </Togglable>    
        </div>
      }
      <div>        
        <button onClick={() => setShowAll(!showAll)}>          
          näytä {showAll ? 'vain tärkeät' : 'kaikki' }        
        </button>      
      </div>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App