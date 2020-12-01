import Button from './Button'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('renders button', () => {
    const { container } = render(<button></button>)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it('is disable by receiving truthy isDisabled', () => {
    const { getByTestId } = render(
      <Button isDisabled={true} onClick={() => {}} />
    )
    expect(getByTestId('button')).toHaveAttribute('disabled')
  })

  const onClickMock = jest.fn()
  it('calls onClick', () => {
    const { getByTestId } = render(<Button onClick={onClickMock} />)
    userEvent.click(getByTestId('button'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
