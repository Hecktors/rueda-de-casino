import React from 'react'
import styled from 'styled-components'

export default function Input(props) {
  return <InputStyled {...props} />
}

const InputStyled = styled.input`
  width: 100%;
  padding: 5px 8px;
  margin-bottom: 10px;
  font-size: inherit;
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: 0;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    border-bottom: solid 1px var(--color-secondary);
  }
`
