import { screen, render } from '@testing-library/react'
import YoutubeVideo from './YoutubeVideo'

describe('Youtube Video', () => {
  const { container } = render(
    <YoutubeVideo video={{ id: '1234', start: '0' }} />
  )
  const videoFrame = screen.getByTestId('video')

  it('renders the component, video frame and button', () => {
    expect(container).toBeInTheDocument()
    expect(videoFrame).toBeInTheDocument()
  })
})
