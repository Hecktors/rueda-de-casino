import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

MoveList.propTypes = { moves: PropTypes.array.isRequired }

export default function MoveList({ moves }) {
  if (!Array.isArray(moves)) return <div className="error-msg">Data Error</div>

  const listItems = moves.map(({ name, id }) => <li key={id}>{name}</li>)

  const content =
    listItems.length > 0 ? (
      listItems
    ) : (
      <span className="warning">No move selected</span>
    )

  return <ListStyled>{content}</ListStyled>
}

const ListStyled = styled.ul`
  width: 100%;
  padding-left: 50px;
  li {
    margin: 5px;
    list-style: none;
  }

  & .warning {
    color: orange;
  }
`
