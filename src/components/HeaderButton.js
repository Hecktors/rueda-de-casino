import styled from 'styled-components/macro'
import { ReactComponent as StopIcon } from '../assets/img/stop-circle.svg'
import Proptypes from 'prop-types'

HeaderButton.propTypes = { handleClick: Proptypes.func.isRequired }

export default function HeaderButton({ handleClick }) {
  return (
    <ButtonStyled onClick={handleClick}>
      <StopIcon />
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);

  svg {
    width: 50px;
    height: 50px;
    fill: var(--icon-color);
  }
`
