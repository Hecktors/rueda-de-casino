import Button from './Button'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

describe('Button', () => {
  const onClickMock = jest.fn()
  it('Calls onClick', () => {
    const { getByTestId } = render(<Button onClick={onClickMock} />)
    userEvent.click(getByTestId('btn'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
