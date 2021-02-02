import { render, screen } from '@testing-library/react'
import AuthOptions from '../AuthOptions'

describe('AuthOptions', () => {
  test('renders header', () => {
    render(<AuthOptions />)
    const headerEl = screen.getByText(/salsa time!/i)
    expect(headerEl).toBeInTheDocument()
  })

  test('renders register button', () => {
    render(<AuthOptions />)
    const buttonEl = screen.getByLabelText(/register/i)
    expect(buttonEl).toBeInTheDocument()
  })

  test('renders login button', () => {
    render(<AuthOptions />)
    const buttonEl = screen.getByLabelText(/login/i)
    expect(buttonEl).toBeInTheDocument()
  })
})
