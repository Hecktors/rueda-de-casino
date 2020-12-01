import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import youTubeIcon from '../assets/img/youTube.png'

SelectedMoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default function SelectedMoveList({ moves, onClick }) {
  const listItems = moves.map(({ name, id, videoId, videoStart }) => (
    <li key={id}>
      <button
        data-testid="listitem-button"
        onClick={() => onClick({ id: videoId, start: videoStart })}
      >
        {name}
        {videoId && (
          <span>
            <img src={youTubeIcon} alt="youtube" />
          </span>
        )}
      </button>
    </li>
  ))

  return (
    <SelectedMoveListStyled>
      <ul>{listItems}</ul>
    </SelectedMoveListStyled>
  )
}

const SelectedMoveListStyled = styled.div`
  width: 100%;
  padding: 30px;

  ul {
    padding: 0;

    li {
      button {
        line-height: 1.4;
        width: 100%;
        font-size: 1.3rem;
        color: var(--color-listitem);
        display: flex;
        justify-content: space-between;
      }
    }

    span:hover {
      opacity: 0.6;
    }

    img {
      height: 14px;
    }
  }
`
