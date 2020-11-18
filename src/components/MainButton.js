import styled from 'styled-components/macro'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'

function MainButton({ appState, handleClick }) {
  const icon =
    appState === 'default' || appState === 'paused' ? (
      <PlayIcon />
    ) : (
      <PauseIcon />
    )

  return <ButtonStyled onClick={() => handleClick()}>{icon}</ButtonStyled>
}

const ButtonStyled = styled.button`
  width: 100%;
  height: 80px;
  background-color: var(--main-button-color);
  svg {
    width: 60px;
    height: 60px;
    fill: var(--icon-color);
  }
`

export default MainButton
