import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function Button({
  onClick,
  isDisabled = false,
  isSmall,
  children,
}) {
  return (
    <ButtonStyled
      onClick={onClick}
      isSmall={isSmall}
      active={!isDisabled}
      disabled={isDisabled}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  background-color: transparent;
  color: var(--color-button);
  svg {
    width: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    height: ${({ isSmall }) => (isSmall ? '40' : '60')}px;
    fill: ${({ active }) =>
      active ? 'var(--color-button)' : 'var(--color-disabled)'};
  }
`
