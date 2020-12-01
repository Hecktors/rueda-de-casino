import styled from 'styled-components/macro'

export default function PlayActionWrapper({ children }) {
  return (
    <PlayActionWrapperStyled className="dark">
      {children}
    </PlayActionWrapperStyled>
  )
}

const PlayActionWrapperStyled = styled.div`
  height: calc(100% * 0.75);
  overflow-x: hidden;
  overflow-y: visible;

  .bg-video {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scale(1.2);
    left: 0;
    z-index: 0;
    filter: blur(2px);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }
`
