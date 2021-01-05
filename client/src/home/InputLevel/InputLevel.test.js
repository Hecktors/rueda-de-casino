import ReactDOM from 'react-dom'
import InputLevel from './InputLevel'
const moves = [
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
  it('renders Accordion', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <InputLevel
        name="test accordion"
        levelMoves={moves}
        levelName="level"
        selectedMoveIDs={[]}
        updateAppState={() => {}}
      />,
      div
    )
    expect(div.firstChild).toMatchSnapshot()
  })
})
