import ReactDOM from 'react-dom'
import FormInputLevel from './FormInputLevel'
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

describe('FormInputLevel', () => {
  it('renders Accordion', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <FormInputLevel
        name="test accordion"
        moves={moves}
        levelName="level"
        selectedMoves={[]}
        userInput={[2]}
        updateUserInput={() => {}}
      />,
      div
    )
    expect(div.firstChild).toMatchSnapshot()
  })
})
