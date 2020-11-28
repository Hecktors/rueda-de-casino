import styled from 'styled-components/macro'

export default function Layout({ children }) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 699px;
  position: relative;
  display: grid;
  grid-template-rows: 80px auto 100px;
  margin: auto;
  color: var(--text-color);

  @media (min-width: 700px) and (orientation: landscape) {
    height: 80%;
    border: 1px solid #fff;
    border-radius: 5px;
  }

  main {
    overflow: auto;
  }

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`
