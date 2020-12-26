import SelectedMoveList from './SelectedMoveList'
import { render } from '@testing-library/react'
const testMoves = [
  {
    _id: 1,
    name: 'la prima',
  },
  {
    _id: 2,
    name: 'sombrero',
  },
]

describe('SelectedMoveList', () => {
  it('renders SelectedMoveList', () => {
    const { container } = render(<SelectedMoveList moves={testMoves} />)
    expect(container).toMatchSnapshot()
  })

  it('shows move names', () => {
    const { getByText } = render(<SelectedMoveList moves={testMoves} />)
    expect(getByText('la prima')).toBeInTheDocument()
    expect(getByText('sombrero')).toBeInTheDocument()
  })
})
