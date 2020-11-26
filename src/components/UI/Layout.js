import styled from 'styled-components/macro'

export default function Layout({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 80px auto 80px;
  height: 100%;
  color: var(--text-color);

  main {
    overflow: auto;
  }

  footer {
    width: 100%;
    display: grid;
    place-items: center;
  }
`
