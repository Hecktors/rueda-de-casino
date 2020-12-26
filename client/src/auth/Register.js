import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Header from '../app/AppHeader'
import Button from '../app/buttons/Buttons/Button'

export default function Register() {
  const history = useHistory()

  return (
    <>
      <Header cols="010">
        <Link to="/">
          <h1 onClick={() => history.push('/')} className="logo">
            Salsa time!
          </h1>
        </Link>
      </Header>
      <RegisterStyled>
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
        <p onClick={() => history.push('/login')}>login later</p>
      </RegisterStyled>
    </>
  )
}

const RegisterStyled = styled.main``
