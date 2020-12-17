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

  &.fade-enter {
    transform: scale(0);
  }
  &.fade-enter-active {
    transform: scale(1);
    transition: transform 500ms;
  }
  &.fade-enter-done {
    transform: scale(1);
  }

  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 2000ms;
  }
  &.fade-exit-done {
    opacity: 0;
  }
`
