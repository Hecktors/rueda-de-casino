import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import Button from './Button'

Video.propTypes = {
  video: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function Video({ video, onClick }) {
  const url = `https://www.youtube.com/embed/${video.id}?controls=0&amp;start=${video.start}`
  const iframe = (
    <iframe
      data-testid="video"
      title="video"
      width="100%"
      height="300"
      src={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )

  return (
    <VideoStyled>
      <div className="button-container">
        <Button onClick={onClick} isSmall>
          <CancelIcon />
        </Button>
      </div>
      {iframe}
    </VideoStyled>
  )
}

const VideoStyled = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  z-index: 99;

  .button-container {
    position: absolute;
    top: 10px;
    right: 0px;
    z-index: 999;
  }
`
