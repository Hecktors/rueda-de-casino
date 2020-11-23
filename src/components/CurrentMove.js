import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

CurrentMove.propTypes = { name: PropTypes.string }

export default function CurrentMove({ name }) {
  return <NameWrapper>{name}</NameWrapper>
}

const NameWrapper = styled.div`
  padding: 20px;
  text-align: center;
  font-family: 'Molle', cursive;

  font-size: 4rem;
  color: var(--color-move);
  margin-top: -10vh;
`
