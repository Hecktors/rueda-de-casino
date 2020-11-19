import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

CurrentMove.propTypes = { title: PropTypes.string.isRequired }

export default function CurrentMove({ title }) {
  return <TitleWrapper>{title}</TitleWrapper>
}

const TitleWrapper = styled.div`
  font-size: 2rem;
`
