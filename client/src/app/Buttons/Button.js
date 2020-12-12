import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  outlined: PropTypes.bool,
}

export default function Button({
  children,
  onClick,
  color,
  className,
  disabled,
  outlined,
}) {
  return (
    <ButtonStyled
      data-testid="button"
      onClick={onClick}
      className={className}
      disabled={disabled}
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
  border: 1px solid var(--color-${(props) => props.color});
  background-color: var(--color-${(props) =>
    props.outlined ? 'bg' : props.color});
  color: var(--color-${(props) => (props.outlined ? props.color : 'bg')});

  &:disabled {
    border: 2px solid var(--color-disabled);
    background-color: var(--color-${(props) =>
      props.outlined ? 'bg' : 'disabled'});
    color: var(--color-${(props) => (props.outlined ? 'disabled' : 'bg')});

`
