import { useState, useContext } from 'react'
import UserContext from '../app/context/UserContext'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Header from '../app/components/AppHeader'
import {
  DeleteAccountButton,
  LogoutButton,
} from '../app/components/buttons/Buttons'
import { BackIconButton } from '../app/components/buttons/IconButtons'
import { setLocalStorage } from '../app/lib/localStorage'
import { deleteUser } from '../app/services/userAPIs'
import DeleteModal from '../app/components/DeleteModal'

export default function UserSettings() {
  const history = useHistory()
  const { userData, setUserData } = useContext(UserContext)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)

  function handelLogout() {
    setUserData({ token: null, user: null })
    setLocalStorage('auth-token', '')
    history.push('/')
  }

  async function handleDelete() {
    setIsDeleteModalDisplayed(false)
    const deleteResponse = await deleteUser(userData.token)
    if (deleteResponse.status === 200) {
      handelLogout()
    }
  }

  return (
    <>
      {isDeleteModalDisplayed && (
        <DeleteModal
          cancel={() => setIsDeleteModalDisplayed(false)}
          handleDelete={handleDelete}
          deleteItem="User Account"
        />
      )}
      <Header cols="110">
        <BackIconButton
          size={'sm'}
          onClick={() => history.push('/edit-overview')}
        />
        <h1>User</h1>
      </Header>
      {userData.user && (
        <UserSettingsStyled>
          <p>User: {userData.user.displayName}</p>
          <LogoutButton onClick={handelLogout} />
          <DeleteAccountButton
            onClick={() => setIsDeleteModalDisplayed(true)}
            outlined
          />
        </UserSettingsStyled>
      )}
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

  p {
    margin-bottom: 10px;
  }
`
