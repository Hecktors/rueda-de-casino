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
  action: PropTypes.string.isRequired,
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
  action,
  size,
  onClick,
}) {
  const color = disabled ? colors['disabled'] : colors[action]

  return (
    <IconButtonStyled
      type={type}
      data-testid="button"
      className={className}
      disabled={disabled}
      color={color}
      size={sizes[size]}
      onClick={onClick}
    >
      {children}
    </IconButtonStyled>
  )
}

const IconButtonStyled = styled.button`
  border-radius: 3px;

  svg {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    fill: ${({ color }) => color};
  }
`
