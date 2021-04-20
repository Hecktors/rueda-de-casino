import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Context } from '../../context/Context'
import { loginUser } from '../../services/userAPIs'
import { LoginButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'
import Header from '../../components/Header'

export default function Login() {
  const history = useHistory()
  const { setUserData, setError } = useContext(Context)
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  let isValid = userInput.email && userInput.password

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!userInput.email || !userInput.password) {
      setError('All required field have to been filled.')
      return
    }

    const loginResponse = await loginUser({
      email: userInput.email,
      password: userInput.password,
    })

    if (loginResponse.status !== 200) {
      setError(loginResponse.data.msg)
    } else {
      setError('')
      setUserData(loginResponse.data)
      history.push('/')
    }
  }

  return (
    <>
      <Header cols="110">
        <BackIconButton size={'sm'} onClick={() => history.push('/')} />
        <Link to="/">
          <h1 onClick={() => history.push('/')} className="logo">
            Salsa time!
          </h1>
        </Link>
      </Header>
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

        <LoginButton onClick={() => {}} disabled={!isValid} />

        <p className="tac">
          Not have an account?{' '}
          <span className="link" onClick={() => history.push('/register')}>
            Register
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
