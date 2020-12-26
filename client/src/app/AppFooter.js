import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Footer.propTypes = {
  msg: PropTypes.string,
  className: PropTypes.string,
}

export default function Footer({ msg = '', className, children }) {
  return (
    <FooterStyled className={className}>
      {msg && <div className="msg-container">{msg}</div>}
      <div className="button-container">{children}</div>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  position: relative;
  z-index: 999;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-rows: auto;

  /* padding: 0 30px; */

  .msg-container {
    position: absolute;
    top: -20px;
    width: 100%;
    padding: 5px 0;
    text-align: center;
    color: var(--color-warning);
  }
  .button-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`
