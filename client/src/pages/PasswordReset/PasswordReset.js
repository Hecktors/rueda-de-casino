import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Context } from '../../context/Context'
import checkEmail from '../../lib/checkEmail'
import { sendResetCode } from '../../services/userAPIs'
import { SendEmailButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'
import Header from '../../components/Header'

export default function PasswordReset() {
  const history = useHistory()
  const { error, setError } = useContext(Context)
  const [userInput, setUserInput] = useState({
    email: '',
  })
  const [emailIsSent, setEmailIsSent] = useState(false)

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
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      error && setError('')
      setEmailIsSent(true)
      console.log('push to setNewPasswordForm')
      // history.push('/')
    }
  }

  return (
    <>
      <Header
        left={
          <BackIconButton size={'sm'} onClick={() => history.push('/login')} />
        }
      />

      <PasswordResetStyled onSubmit={handleSubmit}>
        <h2>Password reset</h2>

        {emailIsSent ? (
          <p>Click on the reset password link in the email you've received.</p>
        ) : (
          <>
            <p>Submit your email to get a reset code</p>
            <div className="form-group">
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

            <SendEmailButton onClick={() => {}} />
          </>
        )}
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
      text-align: center;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }
  }
`
