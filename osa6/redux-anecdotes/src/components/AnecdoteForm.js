import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const createAnecdote = async (event) => {
    event.persist()
    event.preventDefault()
    const content = event.target.anecdote.value
    props.addAnecdote(content)
    props.setNotification(`You added '${event.target.anecdote.value}'`, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ createAnecdote }>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)