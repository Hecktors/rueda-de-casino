import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Header.propTypes = {
  cols: PropTypes.string.isRequired,
}

export default function Header({ cols, children }) {
  if (!children.isArray) {
    children = [children]
  }
  const hasColLeft = /111|110|100/.test(cols)
  const hasColCenter = /111|110|010/.test(cols)
  const hasColRight = /111|101|001/.test(cols)

  const indexCenter = hasColLeft ? 1 : 0
  const indexLeft =
    hasColLeft && hasColCenter ? 2 : !hasColLeft && !hasColCenter ? 0 : 1

  const Placeholder = () => <div />

  const colLeft = hasColLeft ? children[0] : <Placeholder />
  let colCenter = hasColCenter ? children[indexCenter] : <Placeholder />
  let colRight = hasColRight ? children[indexLeft] : <Placeholder />

  return (
    <HeaderStyled>
      {colLeft}
      {colCenter}
      {colRight}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  height: 80px;
  position: relative;
  top: 0;
  z-index: 999;
  display: grid;
  grid-template-columns: 40px auto 40px;
  place-items: center;
  padding: 0 15px;

  h1 {
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: 3px;
    font-weight: lighter;
    text-transform: uppercase;
    color: var(--color-title);
  }

  .logo {
    text-transform: none;
    font-family: 'Molle', cursive;
    color: var(--color-logo);
    letter-spacing: 0px;
    font-size: 2.3rem;
  }
`
