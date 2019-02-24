import React from 'react'
import { render,  fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog component tests', () => {
  let component

  const mockLike = jest.fn()
  const mockDelete = jest.fn()


  beforeEach(() => {
    const testBlog = {
      title: 'TestTitle',
      author: 'TestAuthor',
      url: 'testi.com',
      likes: 12
    }

    component = render(
      <Blog blog={testBlog} handleLike={mockLike} handleDelete={mockDelete} />
    )
  })

  it('Renders the correct info on start', () => {
    const shown = component.container.querySelector('.always-shown')
    expect(shown).not.toHaveStyle('display: none')

    const hidden = component.container.querySelector('.hideable')
    expect(hidden).toHaveStyle('display: none')
  })

  it('Renders the correct info after clicked', () => {
    const shown = component.container.querySelector('.always-shown')
    fireEvent.click(shown)
    expect(shown).not.toHaveStyle('display: none')

    const hidden = component.container.querySelector('.hideable')
    expect(hidden).toHaveStyle('display: block')
  })
})