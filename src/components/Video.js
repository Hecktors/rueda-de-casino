import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'

Video.propTypes = {
  video: PropTypes.object.isRequired,
}

export default function Video({ video }) {
  const url = `https://www.youtube.com/embed/${video.id}?controls=0&amp;start=${video.start}`

  return (
    <ReactPlayer
      url={url}
      className="bg-video"
      playing={true}
      loop={true}
      width="100%"
    />
  )
}
