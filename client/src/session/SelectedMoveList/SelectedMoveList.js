import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { YoutubeIcon, YoutubeGreyIcon } from '../../app/components/Icons'

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
            <span>{videoUrl ? <YoutubeIcon /> : <YoutubeGreyIcon />}</span>
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
  padding: 120px 0;
  display: grid;
  gap: 10px;

  @media (orientation: landscape) {
    padding: 100px 0;
  }

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
