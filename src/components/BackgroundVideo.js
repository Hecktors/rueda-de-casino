import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

BackgroundVideo.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
}

export default function BackgroundVideo({ isPlaying }) {
  const vid = (
    <ReactPlayer
      url="./assets/video/salsa.mp4"
      className="bg-video"
      playing={isPlaying}
      loop={true}
      width="100%"
    />
  )
  return (
    <BackgroundVideoStyled className="absolute dark">
      <div className="overlay"></div>
      {vid}
    </BackgroundVideoStyled>
  )
}

const BackgroundVideoStyled = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: -1;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99;
  }
  .bg-video {
    filter: blur(2px);
  }
`
