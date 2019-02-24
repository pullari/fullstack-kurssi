import React from 'react'
import { render,  fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import SimpleBlog from './SimpleBlog'

describe('Simple Blog component', () => {

  let component

  const mockClick = jest.fn()

  beforeEach(() => {
    const testBlog = {
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'testi.com',
      likes: 12
    }

    component = render(
      <SimpleBlog blog={testBlog} onClick={mockClick}>
        <div className="testDiv" />
      </SimpleBlog>
    )
  })

  it('Renders the correct info', () => {
    expect(component.container).toHaveTextContent(
      'TestTitle'
    )
    expect(component.container).toHaveTextContent(
      'TestAuthor'
    )
    expect(component.container).toHaveTextContent(
      'blog has 12 likes'
    )
  })

  it('Clicking like button works properly', () => {
    const button = component.container.querySelector('.like-button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockClick.mock.calls.length).toBe(2)
  })
})