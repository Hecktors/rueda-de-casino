import styled from 'styled-components/macro'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'

function MainButton({ appState, handleClick }) {
  const icon =
    appState === ('default' || appState === 'pause') ? (
      <PlayIcon />
    ) : (
      <PauseIcon />
    )

  return <ButtonStyled onClick={() => handleClick()}>{icon}</ButtonStyled>
}

const ButtonStyled = styled.button`
  svg {
    width: 60px;
    height: 60px;
    fill: #fff;
  }
`

export default MainButton
