import styled from 'styled-components/macro'
import { ReactComponent as StopIcon } from '../assets/img/stop.svg'

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
    width: 60px;
    height: 60px;
    fill: #fff;
  }
`
