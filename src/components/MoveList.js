import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import youTubeIcon from '../assets/img/youTube.png'
import Video from './Video'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  toggleVideo: PropTypes.func,
}

export default function MoveList({ moves }) {
  const [video, setVideo] = useState({})

  const listItems = moves.map(({ name, id, videoId, videoStart }) => (
    <li key={id}>
      <button
        data-testid="listitem-button"
        onClick={() => setVideo({ id: videoId, start: videoStart })}
      >
        {name}
        {videoId && <img src={youTubeIcon} alt="youtube" />}
      </button>
    </li>
  ))

  return (
    <MoveListStyled>
      {video.id && <Video video={video} onClick={() => setVideo({})} />}
      <ul>{listItems}</ul>
    </MoveListStyled>
  )
}

const MoveListStyled = styled.div`
  padding-top: 20%;

  ul {
    padding: 0;
    margin-left: 30px;

    li {
      button {
        font-size: 1.3rem;
        margin: 1px 0;
        color: var(--color-listitem);
      }
    }

    span:hover {
      opacity: 0.6;
    }

    img {
      margin-left: 10px;
      height: 0.6em;
    }
  }
`
