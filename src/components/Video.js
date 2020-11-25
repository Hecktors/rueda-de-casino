import styled from 'styled-components'
import Button from './Button'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'

export default function Video({ video, onClick }) {
  const url = `${video.url}?controls=0&amp;start=${video.start}`
  const iframe = (
    <iframe
      title="video"
      width="100%"
      height="300"
      src={url}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
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
    top: 15px;
    right: 15px;
    z-index: 999;
  }

  iframe {
  }
`
