import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import AppContext from '../app/context/AppContext'
import { loginUser } from '../app/services/userAPIs'
import { LoginButton } from '../app/components/buttons/Buttons'
import { BackIconButton } from '../app/components/buttons/IconButtons'
import Header from '../app/components/AppHeader'

export default function Login() {
  const history = useHistory()
  const { setUserData, setError } = useContext(AppContext)
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

        <LoginButton onClick={() => { }} disabled={!isValid} />
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
