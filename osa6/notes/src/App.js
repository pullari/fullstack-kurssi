import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Notes from './components/Notes'
import NewNote from './components/AddNoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeNotes()
  },[])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default connect(
  null,
  { initializeNotes }
)(App)