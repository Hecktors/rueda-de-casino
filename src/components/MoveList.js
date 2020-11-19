import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function MoveList({ moves }) {
  if (!Array.isArray(moves)) return <div className="error-msg">Data Error</div>

  const listItems = moves.map(({ title, id }) => <li key={id}>{title}</li>)

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

MoveList.propTypes = { moves: PropTypes.array.isRequired }
