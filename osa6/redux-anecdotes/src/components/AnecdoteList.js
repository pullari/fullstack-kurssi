import React from 'react'
import { voteId } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.setNotification(`You voted for '${anecdote.content}'`, 5000)
    props.voteId(anecdote.id)
  }

  return (
    <div>
      {props.anecdotesToShow
        .sort((a, b) => b.votes > a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: state.anecdotes.filter(
      (anecdote) => 
        anecdote.content.toLowerCase().includes(
          state.filter 
          ? state.filter.toLowerCase() 
          : ''
        )
    )
  }
}

const mapDispatchToProps = {
  voteId,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)