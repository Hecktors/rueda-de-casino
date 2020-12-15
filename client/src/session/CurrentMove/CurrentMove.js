import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

CurrentMove.propTypes = { name: PropTypes.string.isRequired }

export default function CurrentMove({ name }) {
  return <NameWrapper>{name}</NameWrapper>
}

const NameWrapper = styled.div`
  width: 100%;
  margin-top: -20vh;
  text-align: center;
  font-family: 'Molle', cursive;
  font-size: 4rem;
  color: var(--color-primary);
`
