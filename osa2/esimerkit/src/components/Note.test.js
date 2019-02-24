import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Note from './Note'


test('renders content', () => {
  const note = {
    content: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )

  const element = component.getByText('Komponenttitestaus tapahtuu react-testing-library:llä')
  expect(element).toBeDefined()

  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    important: true
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})