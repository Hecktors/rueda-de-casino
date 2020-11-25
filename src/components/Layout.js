import styled from 'styled-components'

export default function Layout({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 80px auto 80px;
  height: 100%;
  color: var(--text-color);

  main {
    /* position: relative; */
    overflow: auto;
  }

  footer {
    width: 100%;
    display: grid;
    place-items: center;
  }
`
