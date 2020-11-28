import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function Button({
  onClick,
  isDisabled = false,
  isSmall = false,
  isOutlined = false,
  color = 'var(--color-button)',
  children,
}) {
  return (
    <ButtonStyled
      data-testid="button"
      onClick={onClick}
      isSmall={isSmall}
      disabled={isDisabled}
      isOutlined={isOutlined}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  background-color: transparent;
  border-radius: 5px;
  padding: 5px 10px;
  color: ${({ disabled }) =>
    disabled ? 'var(--color-disabled)' : 'var(--color-button)'};
  border: 1px solid
    ${({ isOutlined, color }) => (isOutlined ? color : 'transparent')};

  svg {
    width: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    height: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    fill: ${({ disabled }) =>
      disabled ? 'var(--color-disabled)' : 'var(--color-button)'};
  }
`
