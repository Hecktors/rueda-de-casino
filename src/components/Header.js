import styled from 'styled-components/macro'

function Header({ title }) {
  return <HeaderStyled>{title}</HeaderStyled>
}

const HeaderStyled = styled.header`
  display: grid;
  place-items: center;
  font-size: 2rem;
  /* text-transform: uppercase; */
`
export default Header
