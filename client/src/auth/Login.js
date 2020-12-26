import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../app/AppHeader'
import Button from '../app/buttons/Buttons/Button'
import { BackIconButton } from '../app/buttons/IconButtons'
import UserContext from '../app/context/UserContext'
import { loginUser } from '../app/services/userAPIs'

export default function Login() {
  const { setUserData } = useContext(UserContext)
  const history = useHistory()
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const loginRes = await loginUser(userInput)
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
      <LoginStyled onSubmit={handleSubmit}>
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

        <Button onClick={() => {}} color={'secondary'}>
          Login
        </Button>
      </LoginStyled>
    </>
  )
}

const LoginStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;

  .form-group {
    display: flex;
    flex-direction: column;
  }
`
