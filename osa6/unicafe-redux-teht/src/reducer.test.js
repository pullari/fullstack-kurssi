import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('Zeroing works', () => {
    const action = {
      type: 'ZERO'
    }
    const state = {
      good: 10,
      ok: 13,
      bad: 2
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('Incrementing one does not affect others', () => {
    const goodAction = {
      type: 'GOOD'
    }

    const okAction = {
      type: 'OK'
    }
    
    const badAction = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, goodAction)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })

    deepFreeze(newState)
    const newState2 = counterReducer(newState, goodAction)
    expect(newState2).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
    
    deepFreeze(newState2)
    const newState3 = counterReducer(newState2, okAction)
    expect(newState3).toEqual({
      good: 2,
      ok: 1,
      bad: 0
    })

    deepFreeze(newState3)
    const newState4 = counterReducer(newState3, badAction)
    expect(newState4).toEqual({
      good: 2,
      ok: 1,
      bad: 1
    })
  })
})