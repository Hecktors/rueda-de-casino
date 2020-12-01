import Header from './Header'
import { render } from '@testing-library/react'

describe('Header', () => {
  it('renders header', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('has a title', () => {
    const { getByText } = render(
      <Header>
        <h1>title</h1>
      </Header>
    )
    expect(getByText('title')).toBeInTheDocument()
  })
})
