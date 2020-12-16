import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const sizes = {
  xs: '20px',
  sm: '30px',
  md: '40px',
  lg: '60px',
}

const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  tertiary: 'var(--color-tertiary)',
  disabled: 'var(--color-disabled)',
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

export default function IconButton({
  children,
  type,
  className,
  disabled,
  color,
  size,
  onClick,
}) {
  const fillColor = disabled ? colors['disabled'] : colors[color]

  return (
    <IconButtonStyled
      type={type}
      data-testid="button"
      className={className}
      disabled={disabled}
      fillColor={fillColor}
      size={sizes[size]}
      onClick={onClick}
    >
      {children}
    </IconButtonStyled>
  )
}

const IconButtonStyled = styled.button`
  svg {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    fill: ${({ fillColor }) => fillColor};
  }
`
