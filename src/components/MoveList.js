import styled from 'styled-components/macro'

export default function MoveList({ moves }) {
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
  padding: 20px;
  li {
    margin: 5px;
    list-style: none;
  }

  & .warning {
    color: orange;
  }
`
