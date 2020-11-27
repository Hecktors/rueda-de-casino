import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import youTubeIcon from '../assets/img/youTube.png'
import Video from '../components/Video'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  toggleVideo: PropTypes.func,
}

export default function MoveList({ moves }) {
  const [video, setVideo] = useState({})

  const listItems = moves.map(({ name, id, video_id, video_start }) => (
    <li key={id}>
      <button
        data-testid="listitem-button"
        onClick={() => openVideo(video_id, video_start)}
      >
        {name}
        {video_id && <img src={youTubeIcon} alt="youtube" />}
        <span />
      </button>
    </li>
  ))

  function openVideo(id, start) {
    setVideo({ id, start })
  }

  function closeVideo() {
    setVideo({})
  }

  return (
    <MoveListStyled>
      {video.id && <Video video={video} onClick={closeVideo} />}
      <ul>{listItems}</ul>
    </MoveListStyled>
  )
}

const MoveListStyled = styled.div`
  height: 80%;
  display: grid;
  place-items: center;

  ul {
    padding: 0;
    width: 100%;

    li {
      text-align: center;

      button {
        font-size: 1.5rem;
        margin: 5px 0;
        color: var(--color-disabled);
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
