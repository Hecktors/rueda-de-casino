import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { YoutubeIcon, YoutubeIconDisabled } from '../Icons/Icons'

SelectedMoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default function SelectedMoveList({ moves, onClick }) {
  const listItems = moves.map(({ name, _id, videoId, videoStart }) => (
    <li key={_id}>
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
  transform: translateY(-20vh);

  li {
    padding-left: 36px;
    button {
      font-size: 1.6rem;
      display: flex;
      color: var(--color-text);

      svg {
        /* background-color: red; */
        margin-right: 10px;
        margin-top: 3px;
      }
    }
  }
`
