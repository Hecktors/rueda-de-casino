import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  isPaused: PropTypes.bool.isRequired,
}

export default function MoveList({ moves, isPaused }) {
  const listItems = moves.map(({ name, id }) => <li key={id}>{name}</li>)

  return (
    <MoveListStyled isPaused={isPaused}>
      <ul>{listItems}</ul>
      {listItems.length < 2 && (
        <div className="msg">Select at least 2 moves to start</div>
      )}
    </MoveListStyled>
  )
}
const MoveListStyled = styled.div`
  ul {
    padding: 0;
    li {
      list-style: inherit;
      font-size: 1.5rem;
      margin: 5px;
      color: var(--color-disabled);
    }
  }
  .msg {
    margin-top: 20px;
    color: var(--color-message);
    font-size: 1.3rem;
  }
`
