import Button from './Button'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('renders button correctly', () => {
    const { container, getByRole } = render(
      <Button task="save" onClick={() => {}} />
    )
    expect(getByRole('button')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('has correct color value', () => {
    const { getByRole } = render(<Button task="play" onClick={() => {}} />)
    expect(getByRole('button')).toHaveAttribute('color', 'var(--color-primary)')
  })

  it('has correct content', () => {
    const { getByRole } = render(<Button task="save" onClick={() => {}} />)
    expect(getByRole('button')).toHaveTextContent('SAVE')
  })

  it('is disabled if isDisabled is true', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(
      <Button task="reset" isDisabled={true} onClick={onClickMock} />
    )
    const button = getByRole('button')
    expect(button).toHaveAttribute('disabled')
    expect(button).toHaveAttribute('color', 'var(--color-disabled)')
    userEvent.click(button)
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('calls onClick', () => {
    const onClickMock = jest.fn()
    const { getByRole } = render(<Button task="play" onClick={onClickMock} />)
    const button = getByRole('button')
    userEvent.click(button)
    expect(onClickMock).toHaveBeenCalled()
  })
})
