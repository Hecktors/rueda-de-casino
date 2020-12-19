import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
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
  color,
  outlined,
  onClick,
}) {
  let textColor = outlined ? colors[color] : colors['bg']
  let bgColor = outlined ? colors['bg'] : colors[color]
  let bdColor = outlined ? textColor : bgColor

  if (disabled) {
    color = outlined ? colors['disabled'] : colors['bg']
    bgColor = outlined ? colors['bg'] : colors['disabled']
    bdColor = colors['disabled']
  }

  return (
    <ButtonStyled
      type={type}
      data-testid="button"
      className={className}
      textColor={textColor}
      bgColor={bgColor}
      bdColor={bdColor}
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
  border: 1px solid ${({ bdColor }) => bdColor};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`
