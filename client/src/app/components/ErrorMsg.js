import React from 'react'
import styled from 'styled-components'
import { MsgButton } from './buttons/Buttons/Buttons'

export default function ErrorMsg({ msg, clearError }) {
  return (
    <ErrorMsgStyled>
      <span>{msg}</span>
      <MsgButton onClick={clearError} />
    </ErrorMsgStyled>
  )
}

const ErrorMsgStyled = styled.div`
  display: relative;
`
