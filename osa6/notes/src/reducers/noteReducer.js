import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return addData(Array.isArray(action.data), state, action.data)
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

export const createNew = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}

export const toggleImportanceOf = (id) => {  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

const addData = (isArray, state, data) => {
  return isArray ? addNoteArray(state, data) : addNote(state, data);
}

const addNoteArray = (state, arr) => {
  return [...state, ...arr]
}

const addNote = (state, note) => {
  return [...state, note]
}

export default noteReducer 