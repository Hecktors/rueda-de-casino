import styled from 'styled-components/macro'
import { ReactComponent as StopIcon } from '../assets/img/stop-circle.svg'
import { ReactComponent as SettingsIcon } from '../assets/img/settings.svg'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'

import Proptypes from 'prop-types'

HeaderButton.propTypes = {
  onClick: Proptypes.func.isRequired,
  appState: Proptypes.string.isRequired,
}

export default function HeaderButton({ onClick, appState }) {
  let icon = null
  if (appState === 'home') icon = <SettingsIcon />
  if (appState === 'settings') icon = <CancelIcon />
  if (appState === 'sessionPause') icon = <StopIcon />

  return <ButtonStyled onClick={onClick}>{icon}</ButtonStyled>
}

const ButtonStyled = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: inherit;
  transform: translateY(-50%);

  svg {
    width: 40px;
    height: 40px;
    fill: var(--icon-color);
  }
`
