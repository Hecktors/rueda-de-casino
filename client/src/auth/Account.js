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

export default function Account() {
  const history = useHistory()
  const { userData, setUserData } = useContext(AppContext)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)

  function handleLogout() {
    setUserData({ token: null, user: null })
    history.push('/')
  }

  async function handleDelete() {
    setIsDeleteModalDisplayed(false)
    const deleteResponse = await deleteUser(userData.token)
    if (deleteResponse.status === 200) {
      handleLogout()
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
        <AccountStyled>
          <p>{userData.user.displayName}</p>
          <LogoutButton onClick={handleLogout} outlined />
          <DeleteAccountButton
            onClick={() => setIsDeleteModalDisplayed(true)}
          />
        </AccountStyled>
      )}

      <footer>
        <Navigation />
      </footer>
    </>
  )
}

const AccountStyled = styled.main`
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
