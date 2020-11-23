import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

CurrentMove.propTypes = { name: PropTypes.string }

export default function CurrentMove({ name }) {
  return (
    <NameWrapper>
      <span>{name}</span>
    </NameWrapper>
  )
}

const NameWrapper = styled.div`
  height: 100%;
  /* padding-top: 10vh; */
  text-align: center;
  font-family: 'Molle', cursive;

  span {
    font-size: 4rem;
    color: var(--color-move);
    margin-top: -10vh;
  }
`
