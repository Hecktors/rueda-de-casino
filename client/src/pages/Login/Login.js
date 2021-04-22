import { useHistory } from 'react-router-dom'
import useLogin from './useLogin'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import AuthFormInput from '../../components/AuthFormInput'
import { BlueButton } from '../../components/Buttons'

export default function Login() {
  const history = useHistory()
  const { userInput, isRequiredFilled, handleChange, handleSubmit } = useLogin()

  return (
    <>
      <Header />

      <AuthForm onSubmit={handleSubmit}>
        <AuthFormInput
          type="text"
          id="email"
          name="email"
          label="Email*"
          value={userInput.email}
          autoComplete="email"
          onChange={handleChange}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={(e) => e.target.select()}
        />

        <AuthFormInput
          type="password"
          id="password"
          name="password"
          label="Password*"
          className="password"
          value={userInput.password}
          autoComplete="current-password"
          onChange={handleChange}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={(e) => e.target.select()}
        />

        <BlueButton text="Login" disabled={!isRequiredFilled} />

        <p>
          Not have an account?{' '}
          <span className="link" onClick={() => history.push('/register')}>
            Register
          </span>
        </p>
        <p>
          <span
            className="link"
            onClick={() => history.push('/password-reset')}
          >
            Forgot password?
          </span>
        </p>
      </AuthForm>
    </>
  )
}
