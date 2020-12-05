import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Overlay.propTypes = {
  children: PropTypes.array.isRequired,
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
  display: grid;
  place-items: center;
  background-color: ${({ full }) =>
    full ? 'var(--color-bg-overlay-full)' : 'var(--color-bg-overlay)'};
  z-index: ${({ full }) => (full ? '999' : '99')};

  .top-right {
    position: absolute;
    top: 10px;
    right: 5px;
  }
`
