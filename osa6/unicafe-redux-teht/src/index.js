import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const wrap = (actionType) => {
    return () => store.dispatch({
      type: actionType
    })
  }

  return (
    <div>
      <button onClick={wrap('GOOD')}>hyvä</button> 
      <button onClick={wrap('OK')}>neutraali</button> 
      <button onClick={wrap('BAD')}>huono</button>
      <button onClick={wrap('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
