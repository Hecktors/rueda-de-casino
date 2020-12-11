import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Footer.propTypes = {
  msg: PropTypes.string,
}

export default function Footer({ msg = '', children }) {
  return (
    <FooterStyled>
      <div className="msg-container">{msg}</div>
      <div className="button-container">{children}</div>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  position: relative;
  height: 100px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-rows: auto;

  padding: 0 30px;

  .msg-container {
    position: absolute;
    top: -20px;
    width: 100%;
    text-align: center;
    padding: 5px 0;
    color: var(--color-warning);
    background-color: var(--color-bg);
  }
  .button-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`
