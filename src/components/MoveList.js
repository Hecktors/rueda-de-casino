import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import youTubeIcon from '../assets/img/youTube.png'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default function MoveList({ moves, onClick }) {
  const listItems = moves.map(({ name, id, videoId, videoStart }) => (
    <li key={id}>
      <button
        data-testid="listitem-button"
        onClick={() => onClick({ id: videoId, start: videoStart })}
      >
        {name}
        {videoId && <img src={youTubeIcon} alt="youtube" />}
      </button>
    </li>
  ))

  return (
    <MoveListStyled>
      <ul>{listItems}</ul>
    </MoveListStyled>
  )
}

const MoveListStyled = styled.div`
  align-self: stretch;
  padding-bottom: 20vh;
  display: grid;
  place-items: center;
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
      height: 14px;
    }
  }
`
