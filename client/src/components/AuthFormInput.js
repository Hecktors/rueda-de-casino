import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function AuthFormInput({
  type,
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onContextMenu,
  onFocus,
  className,
  error,
  autoComplete,
  ...props
}) {
  return (
    <AuthFormInputStyled>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
        onFocus={onFocus}
        onContextMenu={onContextMenu}
        autoComplete={autoComplete}
        style={error && { border: 'solid 1px red' }}
      />
    </AuthFormInputStyled>
  )
}

AuthFormInput.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func,
  onFocus: PropTypes.func,
}

const AuthFormInputStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`
