import anecdoteService from '../services/anecdotes'

export const voteId = (id) => {
  return async dispatch => {
    const updateble = await anecdoteService.getId(id)
    const newAnec = { ...updateble, votes: updateble.votes + 1 }
    await anecdoteService.update(newAnec)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const addAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'ADD',
      newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(anec => anec.id !== id ? anec : { ...anec, votes: anec.votes + 1 })
    case 'ADD':
      return state.concat(action.newAnecdote)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default reducer