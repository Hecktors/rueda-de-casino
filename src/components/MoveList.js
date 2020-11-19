import styled from 'styled-components/macro'

export default function MoveList({ moves }) {
  return (
    <ListStyled>
      {moves.map(({ title, id }) => (
        <li key={id}>{title}</li>
      ))}
    </ListStyled>
  )
}

const ListStyled = styled.ul`
  width: 100%;
  padding: 20px;
  li {
    margin: 5px;
    list-style: none;
  }
`
