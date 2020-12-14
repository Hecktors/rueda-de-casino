import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

const sizes = {
  xs: '20px',
  sm: '30px',
  md: '40px',
  lg: '60px',
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
  onClick,
  color,
  size,
  className,
  disabled,
  type,
}) {
  return (
    <IconButtonStyled
      data-testid="button"
      onClick={onClick}
      className={className}
      disabled={disabled}
      size={sizes[size]}
      color={color}
      type={type}
    >
      {children}
    </IconButtonStyled>
  )
}

const IconButtonStyled = styled.button`
  border-radius: 3px;

  svg {
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    fill: var(--color-${(props) => props.color});
  }

  :disabled svg {
    fill: var(--color-disabled);
  }
`
