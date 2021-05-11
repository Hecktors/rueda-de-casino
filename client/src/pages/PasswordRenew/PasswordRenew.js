import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import usePasswordRenew from './usePasswordRenew'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import Input from '../../components/Input'
import { BlueButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'

export default function PasswordRenew() {
  const history = useHistory()
  const { resetToken } = useParams()

  const {
    userInput,
    isRequiredFilled,
    handleChange,
    handleSubmit,
  } = usePasswordRenew(resetToken)

  return (
    <>
      <Header
        left={
          <BackIconButton
            size={'sm'}
            onClick={() => history.push('/password-reset')}
          />
        }
      />
      <AuthForm onSubmit={handleSubmit}>
        {/* Hidden input to prevent chrome warning */}
        <input
          type="text"
          name="username"
          autoComplete="username"
          style={{ display: 'none' }}
        />
        <p>Enter your new password.</p>
        <Input
          type="password"
          name="password"
          placeholder="Password*"
          value={userInput.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <Input
          type="passwordCheck"
          name="passwordCheck"
          placeholder="ConfirmPassword*"
          value={userInput.passwordCheck}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <BlueButton text="save password" disabled={!isRequiredFilled} />
      </AuthForm>
    </>
  )
}
