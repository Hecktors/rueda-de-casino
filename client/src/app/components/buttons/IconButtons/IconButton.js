import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const sizes = {
  xs: '20px',
  sm: '30px',
  md: '40px',
  lg: '60px',
  xl: '80px',
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  type: PropTypes.string,
}

export default function IconButton({
  children,
  type,
  className,
  size,
  disabled,
  primary,
  onClick,
}) {

  let fillColor = primary
    ? 'var(--color-primary)'
    : 'var(--color-secondary)'

  if (disabled) fillColor = 'var(--color-disabled)'

  return (
    <IconButtonStyled
      data-testid="button"
      type={type}
      className={className}
      size={sizes[size]}
      disabled={disabled}
      fillColor={fillColor}
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
