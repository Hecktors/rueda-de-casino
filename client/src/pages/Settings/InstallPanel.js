import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import logo from '../../assets/svg/logo.svg'
import { RedButton } from '../../components/Buttons'

InstallPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default function InstallPanel({ onClick }) {
  return (
    <InstallPanelStyled>
      <img src={logo} alt="Install App" height="32px" />
      <div>
        <p>Install the app and make it offline available</p>
        <div className="button-container">
          <RedButton
            text="Install"
            type="button"
            color="primary"
            onClick={onClick}
            ariaLabel={'Install App'}
          />
        </div>
      </div>
    </InstallPanelStyled>
  )
}

const InstallPanelStyled = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 0 0;
  padding: 12px;
  font-size: 0.875rem;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  background-color: var(--color-bg);

  img {
    width: 56px;
    height: 56px;
    margin-right: 10px;
  }

  .button-container {
    text-align: right;
  }
  button {
    width: auto;
    height: auto;
    margin: 10px 0 0 0;
    padding: 8px 16px;
  }
`
