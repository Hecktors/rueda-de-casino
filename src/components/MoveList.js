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
      margin: 5px;
      list-style: none;
      color: var(--color-passive);
    }
  }
  .msg {
    width: 100%;
    position: absolute;
    top: 50px;
    left: 0;
    text-align: center;
    color: var(--color-text);
    font-size: 1rem;
  }
`
