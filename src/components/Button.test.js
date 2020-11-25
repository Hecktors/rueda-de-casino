import ReactDOM from 'react-dom'
import Button from './Button'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

describe('Button', () => {
  it('renders button', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button onClick={() => {}} />, div)
  })

  it('is disable by receiving truthy isDisabled', () => {
    const { getByTestId } = render(
      <Button isDisabled={true} onClick={() => {}} />
    )
    expect(getByTestId('button')).toHaveAttribute('disabled')
  })

  const onClickMock = jest.fn()
  it('alls onClick', () => {
    const { getByTestId } = render(<Button onClick={onClickMock} />)
    userEvent.click(getByTestId('button'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
