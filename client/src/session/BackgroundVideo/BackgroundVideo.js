import ReactPlayer from 'react-player'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

BackgroundVideo.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
}

export default function BackgroundVideo({ isPlaying }) {
  return (
    <BackgroundVideoStyled>
      <ReactPlayer
        url="./assets/video/rueda.mp4"
        className="bg-video"
        playing={isPlaying}
        loop={true}
      />
    </BackgroundVideoStyled>
  )
}

const BackgroundVideoStyled = styled.section`
  .bg-video {
    position: fixed;
    top: 50%;
    transform: translateY(-50%) scale(1.5);
    left: 0;
    z-index: 0;
    filter: blur(3px);
  }
`
