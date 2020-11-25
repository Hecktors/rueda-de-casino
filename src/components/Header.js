import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Header.propTypes = {}

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
    text-align: center;
    font-size: 1.8rem;
    font-weight: normal;
  }

  .logo {
    font-family: 'Molle', cursive;
    color: var(--color-title);
    font-size: 2.5rem;
  }
`
