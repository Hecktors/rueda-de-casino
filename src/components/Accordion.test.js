import ReactDOM from 'react-dom'
import Accordion from './Accordion'
import { render } from '@testing-library/react'
const moves = [
  {
    id: 1,
    name: 'la prima',
    steps: 2,
    filename: 'la_prima.mp3',
  },
  {
    id: 2,
    name: 'sombrero',
    steps: 2,
    filename: 'sombrero.mp3',
  },
]

describe('Accordion', () => {
  it('renders Accordion', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Accordion
        name="test accordion"
        moves={moves}
        selectedMoves={[]}
        userInput={[2]}
        updateUserInput={() => {}}
      />,
      div
    )
    expect(div.firstChild).toMatchSnapshot()
  })
})
