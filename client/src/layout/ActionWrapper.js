import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

ActionWrapper.propTypes = {
  className: PropTypes.bool,
}

export default function ActionWrapper({ children, isDark }) {
  return (
    <ActionWrapperStyled className={isDark ? 'dark' : ''}>
      {children}
    </ActionWrapperStyled>
  )
}

const ActionWrapperStyled = styled.div`
  height: calc(100% * 0.75);
  display: grid;
  place-items: center;
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;

  .bg-video {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scale(1.2);
    left: 0;
    z-index: 0;
    filter: blur(5px);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(var(--color-bg-dark), 0.6);
    z-index: -1;
  }
`
