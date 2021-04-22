import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
  clearError: PropTypes.func.isRequired,
}

export default function ErrorMsg({ msg, clearError }) {
  return (
    <ErrorMsgStyled>
      <span>{msg}</span>
      <button onClick={clearError}>&times;</button>
    </ErrorMsgStyled>
  )
}

const ErrorMsgStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 0.9rem;
  background-color: #e07c7c;
  color: var(--color-bg);

  @media screen and (min-width: 800px) {
    position: fixed;
    max-width: 716px;
    /* top: -40px; */
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px 20px;
    margin: 0 auto;
  }
`
