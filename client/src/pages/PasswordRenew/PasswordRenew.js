import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import usePasswordRenew from './usePasswordRenew'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import AuthFormInput from '../../components/AuthFormInput'
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
        <p>Enter your new password.</p>
        <AuthFormInput
          type="password"
          id="password"
          name="password"
          label="Password*"
          className="password"
          value={userInput.password}
          autoComplete="new-password"
          onChange={handleChange}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={(e) => e.target.select()}
        />

        <AuthFormInput
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          label="Confirm Password*"
          className="passwordCheck"
          value={userInput.passwordCheck}
          autoComplete="new-passwordCheck"
          onChange={handleChange}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={(e) => e.target.select()}
        />

        <BlueButton text="save password" disabled={!isRequiredFilled} />
      </AuthForm>
    </>
  )
}
