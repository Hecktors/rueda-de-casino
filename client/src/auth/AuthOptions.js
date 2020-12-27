import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Header from '../app/components/AppHeader'
import Footer from '../app/components/AppFooter'
import { LoginButton, RegisterButton } from '../app/components/buttons/Buttons'

export default function AuthOptions() {
  const history = useHistory()

  return (
    <>
      <Header cols="010">
        <h1 className="logo">Salsa time!</h1>
      </Header>
      <AuthStyled>
        <RegisterButton onClick={() => history.push('/register')} outlined />
        <LoginButton onClick={() => history.push('/login')} outlined />
      </AuthStyled>
      <Footer />
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
`
