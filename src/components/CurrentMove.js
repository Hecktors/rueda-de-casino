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
  position: relative;
  width: 100%;
  padding-top: 30%;
  text-align: center;
  font-family: 'Molle', cursive;
  span {
    display: inline-block;
    font-size: 4rem;
    color: var(--color-move);
  }
`
