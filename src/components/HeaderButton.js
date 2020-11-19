import styled from 'styled-components/macro'
import { ReactComponent as StopIcon } from '../assets/img/stop-circle.svg'

export default function HeaderButton({ handleClick }) {
  return (
    <ButtonStyled onClick={handleClick}>
      <StopIcon />
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  svg {
    width: 50px;
    height: 50px;
    fill: var(--icon-color);
  }
`
