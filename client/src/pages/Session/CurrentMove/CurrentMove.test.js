import CurrentMove from './CurrentMove'
import { render, screen } from '@testing-library/react'

describe('Current move', () => {
  it('renders current move', () => {
    render(<CurrentMove name="move" />)
    const moveName = screen.getByText('move')
    expect(moveName).toBeInTheDocument()
  })
})
