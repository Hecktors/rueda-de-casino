import styled from 'styled-components/macro'

export default function AuthForm({ children, onSubmit }) {
  return <AuthFormStyled onSubmit={onSubmit}>{children}</AuthFormStyled>
}

const AuthFormStyled = styled.form`
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 10px;

  p {
    text-align: center;
  }
`
