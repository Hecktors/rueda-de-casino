import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  type: PropTypes.string,
}

const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  tertiary: 'var(--color-tertiary)',
  bg: 'var(--color-bg)',
  disabled: 'var(--color-disabled)',
}

export default function Button({
  children,
  type,
  className,
  disabled,
  action,
  outlined,
  onClick,
}) {
  let color = outlined ? colors[action] : colors['bg']
  let bgColor = outlined ? colors['bg'] : colors[action]

  if (disabled) {
    color = outlined ? colors['disabled'] : colors['bg']
    bgColor = outlined ? colors['bg'] : colors['disabled']
  }

  return (
    <ButtonStyled
      type={type}
      data-testid="button"
      className={className}
      color={color}
      bgColor={bgColor}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  padding: 5px 10px;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 1px solid ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
`
