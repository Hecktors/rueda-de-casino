import CurrentMove from './CurrentMove'
import { render } from '@testing-library/react'

describe('Current move', () => {
  it('renders current move', () => {
    const { container, getByText } = render(<CurrentMove name="move" />)
    expect(getByText('move')).toBeInTheDocument()
  })
})
