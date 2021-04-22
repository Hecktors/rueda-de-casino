import { useHistory } from 'react-router-dom'
import usePasswordReset from './usePasswordReset'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import AuthFormInput from '../../components/AuthFormInput'
import { BlueButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'

export default function PasswordReset() {
  const history = useHistory()
  const {
    userInput,
    isRequiredFilled,
    emailIsSent,
    handleChange,
    handleSubmit,
  } = usePasswordReset()

  return (
    <>
      <Header
        left={
          <BackIconButton size={'sm'} onClick={() => history.push('/login')} />
        }
      />

      <AuthForm onSubmit={handleSubmit}>
        {emailIsSent ? (
          <p>Click on the reset password link in the email you've received.</p>
        ) : (
          <>
            <p>Enter your email address to get a password reset link.</p>
            <AuthFormInput
              type="email"
              id="email"
              name="email"
              label="Email*"
              value={userInput.email}
              autoComplete="email"
              onChange={handleChange}
              onContextMenu={(e) => e.preventDefault()}
              onFocus={(e) => e.target.select()}
            />

            <BlueButton text="Get Reset Link" disabled={!isRequiredFilled} />
          </>
        )}
      </AuthForm>
    </>
  )
}
