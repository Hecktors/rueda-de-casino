import { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { Context } from '../../context/Context'
import { deleteUser } from '../../services/userAPIs'
import DeleteModal from '../../components/DeleteModal'
import { DeleteAccountButton, LogoutButton } from '../../components/Buttons'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'

export default function Account() {
  const { userData, setUserData } = useContext(Context)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)

  function handleLogout() {
    setUserData({ token: null, user: null })
  }

  async function handleDelete() {
    setIsDeleteModalDisplayed(false)
    const deleteResponse = await deleteUser(userData.token)
    if (deleteResponse.status === 200) {
      localStorage.clear()
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
