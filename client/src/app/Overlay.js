import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Overlay.propTypes = {
  children: PropTypes.array.isRequired,
  full: PropTypes.bool,
  paused: PropTypes.bool,
}

export default function Overlay({ full, paused, children }) {
  const bgColor = paused
    ? 'var(--color-bg-overlay-paused)'
    : full
    ? 'var(--color-bg-overlay-full)'
    : 'var(--color-bg-overlay)'

  return (
    <OverlayStyled full={full} bgColor={bgColor}>
      {children}
    </OverlayStyled>
  )
}

const OverlayStyled = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: ${({ bgColor }) => bgColor};
  z-index: ${({ full }) => (full ? '999' : '99')};

  .top-right {
    position: absolute;
    top: 10px;
    right: 5px;
  }
`
