import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { YoutubeIcon, YoutubeIconDisabled } from '../Icons/Icons'

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
        <span>{videoId ? <YoutubeIcon /> : <YoutubeIconDisabled />}</span>
        {name}
      </button>
    </li>
  ))

  return <SelectedMoveListStyled>{listItems}</SelectedMoveListStyled>
}

const SelectedMoveListStyled = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: grid;
  gap: 10px;

  li {
    padding-left: 36px;
    button {
      font-size: 1.3rem;
      display: flex;
      color: var(--color-text);

      svg {
        margin-right: 3px;
        margin-top: 1px;
      }
    }
  }
`
