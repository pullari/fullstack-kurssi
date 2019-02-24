import React from 'react'
import { render,  waitForElement } from 'react-testing-library'

jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('Renders only login form before login', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    const loginForm = component.container.querySelector('.login-form')
    expect(loginForm).toBeDefined()

    expect(component.container).not.toContain(
      'Jokin hieno uusi blogi asia'
    )
    expect(component.container).not.toContain(
      'Tärkeä blogi'
    )
    expect(component.container).not.toContain(
      'Miksi testaus on tärkeää'
    )
  })

  it('shows blogs with logged in user', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('kirjaudu ulos')
    )

    const loginForm = component.container.querySelector('.login-form')
    expect(loginForm).toBe(null)

    expect(component.container).toHaveTextContent(
      'Jokin hieno uusi blogi asia Samuli Rouvinen'
    )
    expect(component.container).toHaveTextContent(
      'Tärkeä blogi Martti'
    )
    expect(component.container).toHaveTextContent(
      'Miksi testaus on tärkeää Hessu'
    )
  })
})