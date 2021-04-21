import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { SendEmailButton } from '../../components/Buttons'
import { BackIconButton } from '../../components/IconButtons'
import Header from '../../components/Header'
import usePasswordReset from './usePasswordReset'

export default function PasswordReset() {
  const history = useHistory()
  const {
    userInput,
    isRequiredFilled,
    emailIsSent,
    handleChange,
    handleSubmit,
  } = usePasswordReset()

  return (
    <>
      <Header
        left={
          <BackIconButton size={'sm'} onClick={() => history.push('/login')} />
        }
      />

      <PasswordResetStyled onSubmit={handleSubmit}>
        <h2>Password reset</h2>

        {emailIsSent ? (
          <p>Click on the reset password link in the email you've received.</p>
        ) : (
          <>
            <p>Submit your email to get a reset code</p>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                onChange={handleChange}
                value={userInput.email}
                type="text"
                id="email"
                name="email"
                onFocus={(e) => e.target.select()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            <SendEmailButton onClick={() => {}} disabled={!isRequiredFilled} />
          </>
        )}
      </PasswordResetStyled>
    </>
  )
}

const PasswordResetStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;

    h2 {
      text-align: center;
    }

    p {
      margin: 23px 0;
      text-align: center;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }
  }
`
