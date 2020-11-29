import styled from 'styled-components/macro'

export default function Header({ className, children }) {
  return <HeaderStyled className={className}>{children}</HeaderStyled>
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 40px auto 40px;
  place-items: center;
  padding: 0 15px;

  h1 {
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 3px;
    font-weight: lighter;
    text-transform: uppercase;
    color: var(--color-title);
  }

  .logo {
    text-transform: none;
    font-family: 'Molle', cursive;
    color: var(--color-primary);
    letter-spacing: 0px;
    font-size: 2.3rem;
  }
`
