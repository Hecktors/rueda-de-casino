import styled from 'styled-components/macro'

export default function Overlay({ children }) {
  return <OverlayStyled>{children}</OverlayStyled>
}

const OverlayStyled = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: grid;
  place-items: center;

  .topRight {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`
