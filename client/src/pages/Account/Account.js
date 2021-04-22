import { useState, useContext } from 'react'
import { Context } from '../../context/Context'
import DeleteModal from '../../components/DeleteModal'
import { DeepRedButton, RedButton } from '../../components/Buttons'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import AuthForm from '../../components/AuthForm'

export default function Account() {
  const { authData, logoutUser, deleteUserAccount } = useContext(Context)
  const [isDeleteModalDisplayed, setIsDeleteModalDisplayed] = useState(false)

  return (
    <>
      {isDeleteModalDisplayed && (
        <DeleteModal
          cancel={() => setIsDeleteModalDisplayed(false)}
          handleDelete={deleteUserAccount}
          deleteItem="User Account"
        />
      )}

      <Header />
      <AuthForm>
        <p>Current User: {authData.user.displayName}</p>
        <RedButton text="Log out" onClick={logoutUser} outlined />
        <p>
          If you want to delete your user account, you can do it by clicking the
          button below. Please note: All your stored data will be removed
          forever, there is no chance to get it back.
        </p>
        <DeepRedButton
          text="Delete Account"
          type="button"
          outlined
          onClick={() => setIsDeleteModalDisplayed(true)}
        />
      </AuthForm>
      <footer>
        <Navigation />
      </footer>
    </>
  )
}
