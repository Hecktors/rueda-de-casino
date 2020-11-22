import styled from 'styled-components/macro'
import { ReactComponent as StopIcon } from '../assets/img/stop-circle.svg'
import { ReactComponent as SettingsIcon } from '../assets/img/settings.svg'
import { ReactComponent as CancelIcon } from '../assets/img/cancel.svg'
import { ReactComponent as ResetIcon } from '../assets/img/reset.svg'

import PropTypes from 'prop-types'

HeaderButton.propTypes = {
  onClick: PropTypes.func,
  appState: PropTypes.string.isRequired,
  isResetButton: PropTypes.bool.isRequired,
}

export default function HeaderButton({ appState, isResetButton, onClick }) {
  let icon = null
  if (appState === 'home') icon = <SettingsIcon />
  if (appState === 'settings') icon = <CancelIcon />
  if (appState === 'sessionPause') icon = <StopIcon />
  if (isResetButton) icon = <ResetIcon />

  return (
    <ButtonStyled
      onClick={onClick}
      isLeft={isResetButton}
      form={isResetButton ? 'settings' : null}
      type={isResetButton ? 'reset' : 'button'}
    >
      {icon}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.isLeft ? '10px' : 'auto')};
  right: ${(props) => (props.isLeft ? 'auto' : '10px')};
  font-size: inherit;
  transform: translateY(-50%);

  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-active);
  }
`
