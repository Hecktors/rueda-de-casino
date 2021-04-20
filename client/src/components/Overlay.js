import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Overlay.propTypes = {
  fullCovered: PropTypes.bool,
  paused: PropTypes.bool,
}

export default function Overlay({ children, fullCovered, paused }) {
  const zIndex = fullCovered ? 9999 : 99
  const paddingBottom = fullCovered ? '0' : '25vh'
  const bgColor = fullCovered
    ? 'var(--color-bg-overlay-full)'
    : 'var(--color-bg-overlay)'

  return (
    <OverlayStyled
      zIndex={zIndex}
      bgColor={bgColor}
      paddingBottom={paddingBottom}
    >
      {children}
    </OverlayStyled>
  )
}

const OverlayStyled = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ bgColor }) => bgColor};
  overflow-y: auto;
  z-index: ${({ zIndex }) => zIndex};
  display: grid;
  place-items: center;
  padding-bottom: ${({ paddingBottom }) => paddingBottom};
  overflow: hidden;

  .top-right {
    position: absolute;
    z-index: 9999;
    top: 10px;
    right: 5px;
  }

  @media screen and (min-width: 800px) {
    padding-bottom: 0;
  }
`
