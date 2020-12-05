import { screen, render, fireEvent } from '@testing-library/react'
import YoutubeVideo from './YoutubeVideo'

describe('Youtube Video', () => {
  const { container } = render(
    <YoutubeVideo video={{ id: '1234', start: '0' }} onClick={() => {}} />
  )
  const videoFrame = screen.getByTestId('video')
  const button = screen.getByTestId('button')

  it('renders the component, video frame and button', () => {
    expect(container).toBeInTheDocument()
    expect(videoFrame).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
  it('disappear after clicking the cancel button', () => {
    fireEvent.click(button)
    expect(container).not.toBeInTheDocument()
    expect(videoFrame).not.toBeInTheDocument()
    expect(button).not.toBeInTheDocument()
  })
})
