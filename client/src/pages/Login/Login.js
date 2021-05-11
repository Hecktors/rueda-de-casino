import { useHistory } from 'react-router-dom'
import useLogin from './useLogin'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import Input from '../../components/Input'
import { BlueButton } from '../../components/Buttons'

export default function Login() {
  const history = useHistory()
  const { userInput, isRequiredFilled, handleChange, handleSubmit } = useLogin()

  return (
    <>
      <Header />

      <AuthForm onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email*"
          value={userInput.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <Input
          type="password"
          name="password"
          placeholder="Password*"
          value={userInput.password}
          onChange={handleChange}
          autoComplete="current-password"
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
