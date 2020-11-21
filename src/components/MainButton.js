import styled from 'styled-components/macro'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'
import PropTypes from 'prop-types'

MainButton.propTypes = {
  appState: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

function MainButton({ appState, handleClick }) {
  let buttonContent = ''

  switch (appState) {
    case 'playing':
      buttonContent = <PauseIcon />
      break
    case 'settings':
      buttonContent = 'Save'
      break
    default:
      buttonContent = <PlayIcon />
  }

  appState === 'default' || appState === 'paused' ? <PlayIcon /> : <PauseIcon />

  return appState === 'settings' ? (
    <ButtonStyled form="settings" type="submit">
      {buttonContent}
    </ButtonStyled>
  ) : (
    <ButtonStyled onClick={handleClick}>{buttonContent}</ButtonStyled>
  )
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
