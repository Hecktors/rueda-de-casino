import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../app/context/AppContext'
import { deleteUser } from '../app/services/userAPIs'
import DeleteModal from '../app/components/DeleteModal'
import {
  DeleteAccountButton,
  LogoutButton,
} from '../app/components/buttons/Buttons'
import Header from '../app/components/AppHeader'
import Navigation from '../app/components/Navigation'

export default function UserSettings() {
  const history = useHistory()
  const { userData, setUserData } = useContext(AppContext)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)

  function handelLogout() {
    setUserData({ token: '', user: null })
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

      <Header cols="010">
        <h1 className="logo">Salsa time!</h1>
      </Header>

      {userData.user && (
        <UserSettingsStyled>
          <p>User: {userData.user.displayName}</p>
          <LogoutButton onClick={handelLogout} outlined />
          <DeleteAccountButton
            onClick={() => setIsDeleteModalDisplayed(true)} />
        </UserSettingsStyled>
      )}

      <footer><Navigation /></footer>
    </>
  )
}

const UserSettingsStyled = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  text-align: center;

  p {
    margin-bottom: 10px;
  }
`
