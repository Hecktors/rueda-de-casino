import { render, screen } from '@testing-library/react'
import YoutubeVideo from './YoutubeVideo'

describe('Youtube Video', () => {
  
  it('renders the component, video frame and button', () => {
    render(<YoutubeVideo video={{ id: '1234', start: '0' }} />)
    const videoFrame = screen.getByRole('youtube-video')
    expect(videoFrame).toBeInTheDocument()
  })
})
