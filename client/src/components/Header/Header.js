import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Header.propTypes = {
  className: PropTypes.string,
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node,
}

export default function Header({ className, left, center, right }) {
  left = left || <div data-testid="placeholder" />
  center = center || <h1 className="logo">Salsa time!</h1>
  right = right || <div data-testid="placeholder" />

  return (
    <HeaderStyled className={className}>
      {left}
      {center}
      {right}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 40px auto 40px;
  place-items: center;
  padding: 0 15px;
  z-index: 999;

  h1 {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 1.5rem;
    font-weight: lighter;
    color: var(--color-title);

    &.logo {
      text-transform: none;
      letter-spacing: 0px;
      font-size: 2.3rem;
      font-family: 'Molle', cursive;
      font-display: optional;
      color: var(--color-primary);
    }
  }
`
