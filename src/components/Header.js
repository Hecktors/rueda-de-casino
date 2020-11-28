import styled from 'styled-components/macro'

export default function Header({ children }) {
  return <HeaderStyled>{children}</HeaderStyled>
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 40px auto 40px;
  place-items: center;
  padding: 0 15px;

  h1 {
    /* flex-grow: 1; */
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 3px;
    font-weight: lighter;
    text-transform: uppercase;
    color: var(--color-title);
  }

  .logo {
    font-family: 'Molle', cursive;
    color: var(--color-primary);
    letter-spacing: 0px;
    font-size: 1.5rem;
  }
`
