import Header from './Header'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'

describe('Header', () => {
  it('shows stop button if paused, show correct ', () => {
    const handleClick = jest.fn()
    const { getByText, queryByText, getByRole } = render(
      <Header appState="paused" handleClick={handleClick} />
    )

    expect(getByText(/pause/i)).toBeInTheDocument()
    expect(queryByText(/(rueda de casino|bailamos)/i)).not.toBeInTheDocument()

    const button = getByRole('button')
    expect(button).toBeInTheDocument()

    user.click(button)
    expect(handleClick).toHaveBeenCalled()
  })
})
