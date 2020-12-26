import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Header from '../app/AppHeader'
import Button from '../app/buttons/Buttons/Button'

export default function AuthOptions() {
  const history = useHistory()

  return (
    <>
      <Header cols="010">
        <h1 className="logo">Salsa time!</h1>
      </Header>
      <AuthStyled>
        <Button
          onClick={() => history.push('/register')}
          color={'secondary'}
          outlined
        >
          Register
        </Button>
        <Button
          onClick={() => history.push('/login')}
          color={'secondary'}
          outlined
        >
          Login
        </Button>
        <p onClick={() => history.push('/login')}>not now</p>
      </AuthStyled>
    </>
  )
}

const AuthStyled = styled.main`
  flex-grow: 1;
  display: grid;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  padding: 10px;
  display: flex;

  button {
    width: 100%;
  }
`
