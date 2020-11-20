import styled from 'styled-components/macro'
import HeaderButton from './HeaderButton'
import PropTypes from 'prop-types'

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isPaused: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
}

export default function Header({ title, isPaused, handleClick }) {
  return (
    <HeaderStyled>
      <h1>{title}</h1>
      {isPaused && <HeaderButton handleClick={handleClick} />}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: grid;
  place-items: center;

  h1 {
    font-weight: lighter;
    font-size: 2rem;
  }
`
