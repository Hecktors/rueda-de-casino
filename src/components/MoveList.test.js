import MoveList from './MoveList'
import { render } from '@testing-library/react'
const testMoves = [
  {
    id: 1,
    title: 'la prima',
  },
  {
    id: 2,
    title: 'sombrero',
  },
]

describe('MoveList', () => {
  it('shows move title', () => {
    const { getByText } = render(<MoveList moves={testMoves} />)

    expect(getByText('la prima')).toBeInTheDocument()
    expect(getByText('sombrero')).toBeInTheDocument()
  })

  it('show fallback function if no move selected', () => {
    const { getByText } = render(<MoveList moves={[]} />)

    expect(getByText('No move selected')).toBeInTheDocument()
  })
})
