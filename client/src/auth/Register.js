import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../app/AppHeader'
import Button from '../app/buttons/Buttons/Button'
import { BackIconButton } from '../app/buttons/IconButtons'
import UserContext from '../app/context/UserContext'
import { registerUser } from '../app/services/userAPIs'

export default function Register() {
  const { setUserData } = useContext(UserContext)
  const history = useHistory()
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
    const loginRes = await registerUser(userInput)
    if (loginRes) {
      setUserData(loginRes)
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
      <RegisterStyled onSubmit={handleSubmit}>
        {/* Name */}
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

        {/* Email */}
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
            required
          />
        </div>

        {/* Password */}
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
              required
            />
          </div>
        </div>

        {/* PasswordCheck */}
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
            required
          />
        </div>

        <Button onClick={() => {}} color={'secondary'}>
          Register
        </Button>
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
