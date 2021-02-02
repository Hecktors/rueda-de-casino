import { render, screen } from '@testing-library/react'
import InputLevel from './InputLevel'
const movesMock = [
  {
    _id: 1,
    name: 'la prima',
    steps: 2,
    filename: 'la_prima.mp3',
  },
  {
    _id: 2,
    name: 'sombrero',
    steps: 2,
    filename: 'sombrero.mp3',
  },
]

describe('InputLevel', () => {
  test('renders Accordion', () => {
    render(
      <InputLevel
        name="test accordion"
        levelMoves={movesMock}
        levelName="level"
        selectedMoveIDs={[]}
        updateAppState={() => {}}
      />
    )

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const heading = screen.getByRole('heading', { name: /level/i })
    expect(heading).toBeInTheDocument()
  })
})
