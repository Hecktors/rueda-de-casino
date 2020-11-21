import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  isPaused: PropTypes.bool.isRequired,
}

export default function MoveList({ moves, isPaused }) {
  const listItems = moves.map(({ name, id }) => <li key={id}>{name}</li>)

  return listItems.length > 0 ? (
    <ListStyled isPauses={isPaused}>{listItems}</ListStyled>
  ) : (
    <Message>Select some moves to practice!</Message>
  )
}

const ListStyled = styled.ul`
  padding: 0;
  li {
    margin: 5px;
    list-style: none;
    color: ${(props) =>
      props.isPauses ? 'var(--move-list-pause-color)' : 'var(--text-color)'};
  }
`

const Message = styled.div`
  color: orange;
  font-size: 1.5rem;
`
