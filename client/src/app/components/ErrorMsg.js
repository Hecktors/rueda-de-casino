import React from 'react'
import styled from 'styled-components'

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
`
