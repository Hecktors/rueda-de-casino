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
      color: ${(props) =>
        props.isPaused ? 'var(--move-list-pause-color)' : 'var(--text-color)'};
    }
  }
  .msg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: orange;
    font-size: 1.2rem;
  }
`
