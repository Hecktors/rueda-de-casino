import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

MoveList.propTypes = {
  moves: PropTypes.array.isRequired,
  isPaused: PropTypes.bool.isRequired,
}

export default function MoveList({ moves, isPaused }) {
  const listItemsColor = isPaused
    ? 'var(--move-list-pause-color)'
    : 'var(--text-color)'

  if (!Array.isArray(moves)) return <div className="error-msg">Data Error</div>

  const listItems = moves.map(({ name, id }) => <li key={id}>{name}</li>)

  const content =
    listItems.length > 0 ? (
      listItems
    ) : (
      <span className="warning">No move selected</span>
    )

  return <ListStyled color={listItemsColor}>{content}</ListStyled>
}

const ListStyled = styled.ul`
  width: 100%;
  padding-left: 50px;
  li {
    margin: 5px;
    list-style: none;
    color: ${(props) => props.color};
  }

  & .warning {
    color: orange;
  }
`
