import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'

BackgroundVideo.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
}

export default function BackgroundVideo({ isPlaying }) {
  return (
    <ReactPlayer
      url="./assets/video/rueda.mp4"
      className="bg-video"
      playing={isPlaying}
      loop={true}
      width="100%"
      height="100"
    />
  )
}
