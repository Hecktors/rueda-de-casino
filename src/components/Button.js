import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import {
  SettingsIcon,
  PlayIcon,
  CancelIcon,
  PauseIcon,
  StopIcon,
  ResetIcon,
} from '../components/Icons'

const button = {
  settings: { content: <SettingsIcon />, color: 'var(--color-secondary)' },
  play: { content: <PlayIcon />, color: 'var(--color-primary)' },
  abort: { content: <CancelIcon />, color: 'var(--color-text)' },
  pause: { content: <PauseIcon />, color: 'var(--color-secondary)' },
  stop: { content: <StopIcon />, color: 'var(--color-text)' },
  reset: { content: <ResetIcon />, color: 'var(--color-secondary)' },
  save: { content: 'SAVE', color: 'var(--color-primary)' },
  cancel: { content: 'Cancel', color: 'var(--color-secondary)' },
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  task: PropTypes.string,
  isDisabled: PropTypes.bool,
  isSmall: PropTypes.bool,
  isOutlined: PropTypes.bool,
}

export default function Button({
  onClick,
  className,
  task,
  isDisabled,
  isSmall,
  isOutlined,
}) {
  let color = button[task].color

  if (isDisabled) {
    color = 'var(--color-disabled)'
  }

  return (
    <ButtonStyled
      data-testid="button"
      onClick={onClick}
      isSmall={isSmall}
      disabled={isDisabled}
      isOutlined={isOutlined}
      color={color}
      className={className}
    >
      {button[task].content}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  border-radius: 5px;
  padding: 5px 10px;
  color: ${({ color }) => color};
  border: 1px solid
    ${({ color, isOutlined }) => (isOutlined ? color : 'transparent')};

  svg {
    width: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    height: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    fill: ${({ color }) => color};
  }

  svg:disabled {
    fill: ${({ color }) => color};
  }
`
