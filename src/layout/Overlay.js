import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Overlay.propTypes = {
  full: PropTypes.bool,
}

export default function Overlay({ full, children }) {
  return <OverlayStyled full={full}>{children}</OverlayStyled>
}

const OverlayStyled = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ full }) =>
    full ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.6)'};
  z-index: ${({ full }) => (full ? '999' : '99')};
  display: grid;
  place-items: center;

  .topRight {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`
