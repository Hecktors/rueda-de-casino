import { useHistory } from 'react-router-dom'
import useRegister from './useRegister'
import Header from '../../components/Header'
import AuthForm from '../../components/AuthForm'
import Input from '../../components/Input'
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
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={userInput.name}
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder="Email*"
          value={userInput.email}
          onChange={handleChange}
        />

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
