import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Overlay.propTypes = {
  children: PropTypes.array.isRequired,
  fullCovered: PropTypes.bool,
  paused: PropTypes.bool,
}

export default function Overlay({ fullCovered, paused, children }) {
  const bgColor = paused
    ? 'var(--color-bg-overlay-paused)'
    : fullCovered
    ? 'var(--color-bg-overlay-full)'
    : 'var(--color-bg-overlay)'

  return (
    <OverlayStyled full={fullCovered} bgColor={bgColor}>
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
  z-index: ${({ full }) => (full ? '9999' : '99')};

  .top-right {
    position: absolute;
    z-index: 9999;
    top: 10px;
    right: 5px;
  }
`
