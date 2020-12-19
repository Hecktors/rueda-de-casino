import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'

YoutubeVideo.propTypes = {
  video: PropTypes.object.isRequired,
}

export default function YoutubeVideo({ video }) {
  const url = `${video.url}`

  return (
    <ReactPlayer
      data-testid="video"
      url={url}
      className="bg-video"
      playing={true}
      loop={true}
      width="100%"
      height="100%"
      config={{
        youtube: {
          playerVars: {
            start: video.start,
          },
        },
      }}
    />
  )
}
