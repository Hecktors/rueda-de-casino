import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { LoginButton } from '../../components/Buttons'
import Header from '../../components/Header'
import useLogin from './useLogin'

export default function Login() {
  const history = useHistory()
  const { userInput, isRequiredFilled, handleChange, handleSubmit } = useLogin()

  return (
    <>
      <Header />

      <LoginStyled onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            onChange={handleChange}
            value={userInput.email}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <div className="pos">
            <input
              className="password"
              onChange={handleChange}
              value={userInput.password}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <LoginButton onClick={() => {}} disabled={!isRequiredFilled} />

        <p className="tac">
          Not have an account?{' '}
          <span className="link" onClick={() => history.push('/register')}>
            Register
          </span>
        </p>
        <p className="tac">
          <span
            className="link"
            onClick={() => history.push('/password-reset')}
          >
            Forgot password?
          </span>
        </p>
      </LoginStyled>
    </>
  )
}

const LoginStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  .form-group {
    display: flex;
    flex-direction: column;
  }
`
