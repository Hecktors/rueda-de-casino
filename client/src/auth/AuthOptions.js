import { useContext } from 'react'
import styled from 'styled-components'
import UserContext from '../app/context/UserContext'
import { useHistory } from 'react-router-dom'
import Header from '../app/AppHeader'
import Button from '../app/buttons/Buttons/Button'
import Footer from '../app/AppFooter'

export default function AuthOptions() {
  const history = useHistory()
  const { userData } = useContext(UserContext)
  console.log({ userData })

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
          Log in
        </Button>
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

  button {
    width: 100%;
  }
`
