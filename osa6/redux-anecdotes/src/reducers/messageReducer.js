const initialState = ''

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_MESSAGE':
      return {...state, message: action.data.message}
    case 'CLEAR':
      return { ...state, message: '' }
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_MESSAGE',
      data: { message }
    })

    await (() => { return new Promise(resolve => setTimeout(resolve, time)) })()

    dispatch({
      type: 'SHOW_MESSAGE',
      data: {message: ''}
    })
  }
}

export const showMessage = (message) => {
  return {
    type: 'SHOW_MESSAGE',
    data: { message }
  }
} 

export default reducer