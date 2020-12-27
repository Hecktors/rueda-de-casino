import { useState, useContext } from 'react'
import UserContext from '../app/context/UserContext'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../app/components/AppHeader'
import { loginUser, registerUser } from '../app/services/userAPIs'
import { RegisterButton } from '../app/components/buttons/Buttons'
import { BackIconButton } from '../app/components/buttons/IconButtons'
import ErrorMsg from '../app/components/ErrorMsg'

export default function Register() {
  const { setUserData } = useContext(UserContext)
  const history = useHistory()
  const [error, setError] = useState('')
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  })

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const registerResponse = await registerUser(userInput)
    if (registerResponse.status !== 200) {
      setError(registerResponse.data.msg)
    } else {
      error && setError('')
      const loginResponse = await loginUser({
        email: userInput.email,
        password: userInput.password,
      })
      setUserData(loginResponse.data)
      history.push('/')
    }
  }

  return (
    <>
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}
      <Header cols="110">
        <BackIconButton size={'sm'} onClick={() => history.push('/')} />
        <Link to="/">
          <h1 onClick={() => history.push('/')} className="logo">
            Salsa time!
          </h1>
        </Link>
      </Header>
      <RegisterStyled onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            value={userInput.name}
            type="text"
            id="name"
            name="name"
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
            onFocus={(e) => e.target.select()}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        <RegisterButton onClick={() => {}} />

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
