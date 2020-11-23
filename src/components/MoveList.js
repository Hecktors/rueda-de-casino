import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
}

export default function MoveList({ moves }) {
  const listItems = moves.map(({ name, id }) => <li key={id}>{name}</li>)
  return (
    <MoveListStyled>
      <ul>{listItems}</ul>
    </MoveListStyled>
  )
}
const MoveListStyled = styled.div`
  height: 80%;
  display: grid;
  place-items: center;
  ul {
    padding: 0;
    li {
      font-size: 1.5rem;
      margin: 5px;
      color: var(--color-disabled);
    }
  }
`
