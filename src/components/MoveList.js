import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Video from '../components/Video'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  toggleVideo: PropTypes.func,
}

export default function MoveList({ moves }) {
  const [video, setVideo] = useState({})

  const listItems = moves.map(({ name, id, video_url, video_start }) => (
    <li key={id} onClick={() => openVideo(video_url, video_start)}>
      {name}
    </li>
  ))

  function openVideo(url, start) {
    setVideo({ url, start })
  }

  function closeVideo() {
    setVideo({})
  }

  return (
    <MoveListStyled>
      {video.url && <Video video={video} onClick={closeVideo} />}
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

    li {
      cursor: pointer;
      font-size: 1.5rem;
      margin: 5px;
      color: var(--color-disabled);
    }

    li:hover {
      opacity: 0.6;
    }
  }
`
