import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

CurrentMove.propTypes = { name: PropTypes.string.isRequired }

export default function CurrentMove({ name }) {
  return <NameWrapper>{name}</NameWrapper>
}

const NameWrapper = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 2rem;
`
