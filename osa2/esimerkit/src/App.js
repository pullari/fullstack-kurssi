import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('uusi muistiinpano...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService      
      .getAll()      
      .then(initialNotes => {        
        setNotes(initialNotes)    
      })
  },[])

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
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService      
      .create(noteObject)      
      .then(returnedNote => {        
        setNotes(notes.concat(returnedNote))   
        setNewNote('')      
      })
    setNewNote('')
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <Notification message={errorMessage} />
      <div>        
        <button onClick={() => setShowAll(!showAll)}>          
          näytä {showAll ? 'vain tärkeät' : 'kaikki' }        
        </button>      
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange} />
        <button type="submit">tallenna</button>
      </form> 
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