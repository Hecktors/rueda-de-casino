import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import ReactPlayer from 'react-player'

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
    left: 0;
    transform: translateY(-50%) scale(2);
    z-index: 0;
    filter: blur(3px);
    overflow: hidden;
  }

  @media (orientation: landscape) {
    overflow: hidden;
  }

  @media screen and (min-width: 730px) {
    padding-top: 45%;
    overflow: hidden;

    .bg-video {
      padding-top: 3%;
      position: relative;
    }
  }
`
