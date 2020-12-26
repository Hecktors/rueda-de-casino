import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const sizes = {
  xs: '20px',
  sm: '30px',
  md: '40px',
  lg: '60px',
}

IconButton.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
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
  size,
  onClick,
}) {
  const fillColor = disabled
    ? 'var(--color-disabled)'
    : 'var(--color-secondary)'

  return (
    <IconButtonStyled
      data-testid="button"
      type={type}
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
