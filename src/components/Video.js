import styled from 'styled-components/macro'
import ReactPlayer from 'react-player'
import PropTypes from 'prop-types'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import Button from './Button'

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function Video({ video, onClick }) {
  const url = `https://www.youtube.com/embed/${video.id}?controls=0&amp;start=${video.start}`

  const vid = (
    <ReactPlayer
      url={url}
      className="bg-video"
      playing={true}
      loop={true}
      width="100%"
    />
  )

  return (
    <VideoStyled>
      <Button onClick={onClick} isSmall>
        <CancelIcon />
      </Button>
      {vid}
    </VideoStyled>
  )
}

const VideoStyled = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: grid;
  place-items: center;

  button {
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 999;
  }
`
