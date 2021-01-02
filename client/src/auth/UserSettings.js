import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import AppContext from '../app/context/AppContext'
import { deleteUser } from '../app/services/userAPIs'
import DeleteModal from '../app/components/DeleteModal'
import {
  DeleteAccountButton,
  LogoutButton,
} from '../app/components/buttons/Buttons'
import { BackIconButton } from '../app/components/buttons/IconButtons'
import Header from '../app/components/AppHeader'

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
      <Header cols="110">
        <BackIconButton
          size={'sm'}
          onClick={() => history.push('/edit-overview')}
        />
        <h1 className="logo">Salsa time!</h1>
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
