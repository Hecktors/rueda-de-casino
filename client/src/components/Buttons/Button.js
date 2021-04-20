import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Button.propTypes = {
  children: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  inline: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  bg: 'var(--color-bg)',
  disabled: 'var(--color-disabled)',
}

export default function Button({
  children,
  ariaLabel,
  className,
  type,
  color,
  disabled,
  outlined,
  inline,
  onClick,
}) {
  const width = inline ? '30%' : '60%'
  let textColor = outlined ? colors[color] : colors['bg']
  let bgColor = outlined ? colors['bg'] : colors[color]
  let bdColor = outlined ? textColor : bgColor

  if (disabled) {
    textColor = outlined ? colors['disabled'] : colors['bg']
    bgColor = outlined ? colors['bg'] : colors['disabled']
    bdColor = colors['disabled']
  }

  return (
    <ButtonStyled
      type={type}
      aria-label={ariaLabel}
      className={className}
      disabled={disabled}
      width={width}
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
  width: ${({ width }) => width};
  max-width: 240px;
  margin: 15px auto;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
  border: 1px solid ${({ bdColor }) => bdColor};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`
