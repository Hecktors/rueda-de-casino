import Button from './Button'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
// import Home from '../pages/Home'

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

// describe('Home Buttons', () => {
//   it.todo('renders button', () => {
//     const { getByTestId } = render(<Home />)
//     const button = getByTestId('button')
//     expect(button).toBeInTheDocument()
//   })
// })

// using it.todo
// Home
// Test: Button task = 'play'
// Test: Button onClick = 'history.push('/session')
