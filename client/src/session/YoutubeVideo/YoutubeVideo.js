import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'

YoutubeVideo.propTypes = {
  video: PropTypes.object.isRequired,
}

export default function YoutubeVideo({ video }) {
  // const videoID = video.url.slice(video.url.indexOf('=') + 1, -1)
  // const url = `https://www.youtube.com/embed/${videoID}?controls=0&amp`
  const url = `${video.url}`

  return (
    <ReactPlayer
      data-testid="video"
      url={url}
      className="bg-video"
      playing={true}
      loop={true}
      width="100%"
    />
  )
}
