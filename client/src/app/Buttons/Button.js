import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  outlined: PropTypes.bool,
}

export default function Button({
  children,
  onClick,
  color,
  className,
  isDisabled,
  outlined,
}) {
  return (
    <ButtonStyled
      data-testid="button"
      onClick={onClick}
      className={className}
      disabled={isDisabled}
      color={color}
      outlined={outlined}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  padding: 5px 10px;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) =>
    props.outlined ? 'var(--color-bg)' : props.color};
  color: ${(props) => (props.outlined ? props.color : 'var(--color-bg)')};

  &:disabled {
    border: 2px solid var(--color-disabled);
    background-color: ${(props) =>
      props.outlined ? 'var(--color-bg)' : 'var(--color-disabled)'};
    color: ${(props) =>
      props.outlined ? 'var(--color-disabled)' : 'var(--color-bg)'};
  }
`
