import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'

MainButton.propTypes = {
  appState: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

function MainButton({ appState, onClick, isDisabled }) {
  let buttonLabel = <PlayIcon />
  if (appState === 'sessionPlay') buttonLabel = <PauseIcon />
  if (appState === 'settings') buttonLabel = 'Save'

  return appState === 'settings' ? (
    <ButtonStyled form="settings" type="submit">
      {buttonLabel}
    </ButtonStyled>
  ) : (
    <ButtonStyled
      disabled={isDisabled}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {buttonLabel}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  background-color: transparent;
  color: var(--color-button);
  svg {
    width: 60px;
    height: 60px;
    fill: ${({ isDisabled }) =>
      isDisabled ? 'var(--color-disabled)' : 'var(--color-button)'};
  }
`

export default MainButton
