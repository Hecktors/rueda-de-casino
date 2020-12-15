import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { YoutubeIcon, YoutubeIconDisabled } from '../Icons/Icons'

SelectedMoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}

export default function SelectedMoveList({ moves, onClick }) {
  return (
    <SelectedMoveListStyled>
      {moves.map(({ name, _id, videoUrl, videoStart }) => (
        <li key={_id}>
          <button
            data-testid="listitem-button"
            onClick={() => onClick({ url: videoUrl, start: videoStart })}
          >
            <span>{videoUrl ? <YoutubeIcon /> : <YoutubeIconDisabled />}</span>
            {name}
          </button>
        </li>
      ))}
    </SelectedMoveListStyled>
  )
}

const SelectedMoveListStyled = styled.ul`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 10vh;
  display: grid;
  gap: 10px;
  transform: translateY(-20vh);

  li {
    padding-left: 24px;
    button {
      font-size: 1.5rem;
      display: flex;
      color: var(--color-text);

      svg {
        margin-right: 10px;
        margin-top: 3px;
      }
    }
  }
`
