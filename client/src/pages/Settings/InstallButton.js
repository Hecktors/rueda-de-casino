import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import logo from '../../assets/svg/logo.svg'

InstallButton.propTypes = {
  installApp: PropTypes.func.isRequired,
}

export default function InstallButton({ onClick }) {
  return (
    <InstallButtonStyled
      type="button"
      onClick={onClick}
      ariaLabel={'Install App'}
    >
      <img src={logo} alt="Install App" height="32px" />
      Install App On Your Device
    </InstallButtonStyled>
  )
}

const InstallButtonStyled = styled.div`
  margin: 100px auto 0;
  width: 100%;
  max-width: 300px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
    margin-right: 5px;
  }
`
