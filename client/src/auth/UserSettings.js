import { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../app/context/UserContext'
import { useHistory } from 'react-router-dom'
import Header from '../app/AppHeader'
import Button from '../app/buttons/Buttons/Button'
import { BackIconButton } from '../app/buttons/IconButtons'
import { setLocalStorage } from '../app/lib/localStorage'

export default function UserSettings() {
  const history = useHistory()
  const { userData, setUserData } = useContext(AppContext)
  console.log({ userData })

  function handelLogout() {
    setUserData({ token: null, user: null })
    setLocalStorage('auth-token', '')
    history.push('/')
  }

  return (
    <>
      <Header cols="110">
        <BackIconButton size={'sm'} onClick={() => history.push('/home')} />
        <h1>User Settings</h1>
      </Header>
      <UserSettingsStyled>
        User: {userData.user.displayName}
        <Button onClick={handelLogout} color={'secondary'} outlined>
          Log out
        </Button>
      </UserSettingsStyled>
    </>
  )
}

const UserSettingsStyled = styled.main`
  flex-grow: 1;
  display: grid;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  display: flex;

  button {
    width: 100%;
  }
`
