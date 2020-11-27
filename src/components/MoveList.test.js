import MoveList from './MoveList'
import { render } from '@testing-library/react'
const testMoves = [
  {
    id: 1,
    name: 'la prima',
  },
  {
    id: 2,
    name: 'sombrero',
  },
]

describe('MoveList', () => {
  it('renders MoveList', () => {
    const { container } = render(<MoveList moves={testMoves} />)
    expect(container).toMatchSnapshot()
  })

  it('shows move names', () => {
    const { getByText } = render(<MoveList moves={testMoves} />)
    expect(getByText('la prima')).toBeInTheDocument()
    expect(getByText('sombrero')).toBeInTheDocument()
  })
})
