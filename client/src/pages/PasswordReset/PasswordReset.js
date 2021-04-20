import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../context/AppContext'
import checkEmail from '../lib/checkEmail'
import { sendResetCode } from '../services/userAPIs'
import { GetCodeButton } from '../components/buttons/Buttons'
import { BackIconButton } from '../components/buttons/IconButtons'
import Header from '../components/Header'

export default function PasswordReset() {
  const history = useHistory()
  const { error, setError } = useContext(AppContext)
  const [userInput, setUserInput] = useState({
    email: '',
  })

  const isEmailValid = checkEmail(userInput.email)

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!userInput.email) {
      setError('All required field have to been filled.')
      return
    }

    if (!isEmailValid) {
      setError('The entered email is not valid')
      return
    }

    const response = await sendResetCode(userInput.email)
    console.log(response)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      error && setError('')
      console.log('push to setNewPasswordForm')
      // history.push('/')
    }
  }

  return (
    <>
      <Header cols="110">
        <BackIconButton size={'sm'} onClick={() => history.push('/')} />
        <Link to="/">
          <h1 onClick={() => history.push('/')} className="logo">
            Salsa time!
          </h1>
        </Link>
      </Header>
      <PasswordResetStyled onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Password reset</h2>
          <p>Submit your email to get a reset code</p>
          <label htmlFor="email">Email*</label>
          <input
            onChange={handleChange}
            value={userInput.email}
            type="text"
            id="email"
            name="email"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        <GetCodeButton onClick={() => {}} />
      </PasswordResetStyled>
    </>
  )
}

const PasswordResetStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  h2 {
    text-align: center;
  }

  p {
    margin: 23px 0;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }
`
