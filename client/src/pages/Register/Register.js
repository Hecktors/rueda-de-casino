import { useHistory } from 'react-router-dom'
import useRegister from './useRegister'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import AuthFormInput from '../../components/AuthFormInput'
import { BlueButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'

export default function Register() {
  const history = useHistory()
  const {
    userInput,
    isRequiredFilled,
    handleChange,
    handleSubmit,
  } = useRegister()

  return (
    <>
      <Header
        left={<BackIconButton size={'sm'} onClick={() => history.push('/')} />}
      />
      <AuthForm onSubmit={handleSubmit}>
        <AuthFormInput
          type="text"
          id="name"
          name="name"
          label="Name"
          value={userInput.name}
          autoComplete="name"
          onChange={handleChange}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={(e) => e.target.select()}
        />

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

        <AuthFormInput
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          label="Confirm Password*"
          className="passwordCheck"
          value={userInput.passwordCheck}
          autoComplete="current-passwordCheck"
          onChange={handleChange}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={(e) => e.target.select()}
        />

        <BlueButton text="Register" disabled={!isRequiredFilled} />

        <p>
          Already have an account?{' '}
          <span className="link" onClick={() => history.push('/login')}>
            Log in
          </span>
        </p>
      </AuthForm>
    </>
  )
}
