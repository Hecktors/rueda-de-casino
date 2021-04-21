import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import useRegister from './useRegister'
import { RegisterButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'
import Header from '../../components/Header'

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

      <RegisterStyled onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={userInput.name}
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            autoFocus
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

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
              autoComplete="new-password"
              onFocus={(e) => e.target.select()}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="passwordCheck">Confirm Password*</label>
          <input
            onChange={handleChange}
            value={userInput.passwordCheck}
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            autoComplete="new-password"
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        <RegisterButton onClick={() => {}} disabled={!isRequiredFilled} />

        <p className="tac">
          Already have an account?{' '}
          <span className="link" onClick={() => history.push('/login')}>
            Log in
          </span>
        </p>
      </RegisterStyled>
    </>
  )
}

const RegisterStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;

  .form-group {
    display: flex;
    flex-direction: column;
  }
`
