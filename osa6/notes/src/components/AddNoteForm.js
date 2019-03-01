import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/noteReducer'

const NewNote = (props) => {
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNew(content)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">lisää</button>
    </form>
  )
}

export default connect(
  null, { createNew }
)(NewNote)