import { useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { Context } from '../../context/Context'
import DeleteModal from '../../components/DeleteModal'
import { DeleteAccountButton, LogoutButton } from '../../components/Buttons'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'

export default function Account() {
  const { authData, logoutUser, deleteUserAccount } = useContext(Context)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)

  async function handleDelete() {
    deleteUserAccount()
    setIsDeleteModalDisplayed(false)
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

      <Header />

      {authData.user && (
        <AccountStyled>
          <p>{authData.user.displayName}</p>
          <LogoutButton onClick={logoutUser} outlined />
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
