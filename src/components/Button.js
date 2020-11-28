import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isSmall: PropTypes.bool,
  isPrimary: PropTypes.bool,
}

export default function Button({
  onClick,
  isDisabled = false,
  isSmall = false,
  isPrimary = false,
  children,
}) {
  let color = 'var(--color-button)'
  color = isPrimary ? 'var(--color-primary)' : 'var(--color-button)'

  if (isDisabled) {
    color = 'var(--color-disabled)'
  }

  return (
    <ButtonStyled
      data-testid="button"
      onClick={onClick}
      isSmall={isSmall}
      disabled={isDisabled}
      color={color}
      isPrimary={isPrimary}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  background-color: transparent;
  border-radius: 5px;
  padding: 5px 10px;
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  color: ${({ color }) => color};
  border: 1px solid
    ${({ color, isPrimary }) => (isPrimary ? color : 'transprant')};
  svg {
    width: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    height: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    fill: ${({ color, isDisabled }) =>
      isDisabled ? 'var(--color-disabled)' : color};
  }
`
