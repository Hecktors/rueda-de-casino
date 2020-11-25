import ReactDOM from 'react-dom'
import Header from './Header'

describe('Header', () => {
  it('renders header', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Header />, div)
  })
})
