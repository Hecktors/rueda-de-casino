import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
  inline: PropTypes.bool,
  type: PropTypes.string,
}

const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
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
  inline,
  onClick,
}) {
  const width = inline ? '30%' : '50%'
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
  margin: 15px auto;
  padding: 10px 16px;
  font-size: 1rem;
  border-radius: 30px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid ${({ bdColor }) => bdColor};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ textColor }) => textColor};
`
