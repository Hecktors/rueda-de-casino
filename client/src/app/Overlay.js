import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Overlay.propTypes = {
  children: PropTypes.array.isRequired,
  fullCovered: PropTypes.bool,
  paused: PropTypes.bool,
}

export default function Overlay({ children, fullCovered, paused }) {
  const zIndex = fullCovered ? 9999 : 99
  const bgColor = paused
    ? 'var(--color-bg-overlay-paused)'
    : fullCovered
    ? 'var(--color-bg-overlay-full)'
    : 'var(--color-bg-overlay)'

  return (
    <OverlayStyled zIndex={zIndex} bgColor={bgColor}>
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
  padding-top: 100px;
  background-color: ${({ bgColor }) => bgColor};
  z-index: ${({ zIndex }) => zIndex};

  .top-right {
    position: absolute;
    z-index: 9999;
    top: 10px;
    right: 5px;
  }
`
