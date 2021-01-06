import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Header.propTypes = {
  className: PropTypes.string,
  cols: PropTypes.string.isRequired,
}

export default function Header({ children, className, cols }) {
  if (!children.isArray) children = [children]
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
    <HeaderStyled className={className}>
      {colLeft}
      {colCenter}
      {colRight}
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
      color: var(--color-primary);
    }
  }
`
