import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { LoginButton, RegisterButton } from '../../components/buttons/Buttons'
import Header from '../../components/Header'

export default function AuthOptions() {
  const history = useHistory()

  return (
    <>
      <Header cols="010">
        <h1 className="logo">Salsa time!</h1>
      </Header>
      <AuthStyled>
        <RegisterButton onClick={() => history.push('/register')} outlined />
        <LoginButton
          aria-label="Login"
          onClick={() => history.push('/login')}
          outlined
        />
      </AuthStyled>
    </>
  )
}

const AuthStyled = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`
