import React from 'react'
import styled from 'styled-components/macro'
import { useHistory, useParams } from 'react-router-dom'
import usePasswordRenew from './usePasswordRenew'
import { RegisterButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'
import Header from '../../components/Header'

export default function PasswordRenew() {
  const history = useHistory()
  const { resetToken } = useParams()

  const {
    userInput,
    isRequiredFilled,
    handleChange,
    handleSubmit,
  } = usePasswordRenew(resetToken)

  return (
    <>
      <Header
        left={
          <BackIconButton
            size={'sm'}
            onClick={() => history.push('/password-reset')}
          />
        }
      />

      <NewPasswordStyled onSubmit={handleSubmit}>
        <h3>Enter your new password</h3>
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

        <p className="tac"></p>
      </NewPasswordStyled>
    </>
  )
}

const NewPasswordStyled = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;

  .form-group {
    display: flex;
    flex-direction: column;
  }
`
