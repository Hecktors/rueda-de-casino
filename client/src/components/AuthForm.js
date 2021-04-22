import styled from 'styled-components/macro'

export default function AuthForm({ children, onSubmit }) {
  return <AuthFormStyled onSubmit={onSubmit}>{children}</AuthFormStyled>
}

const AuthFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20px 40px;
  gap: 20px;
  padding: 10px;

  p {
    text-align: center;
  }
`
