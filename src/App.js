import Header from './components/Header'
import MainButton from './components/MainButton'
import styled from 'styled-components/macro'

function App() {
  return (
    <AppStyled>
      <Header title="Rueda De Salsa" />
      <main></main>
      <FooterStyled>
        <MainButton task="play" />
      </FooterStyled>
    </AppStyled>
  )
}

export default App

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: 70px auto 100px;
  height: 100vh;
  font-family: Helvetica;
  font-size: 112.5%;
  color: #e5e5e5;
  background-color: #16191d;
`

const FooterStyled = styled.footer`
  width: 100%;
  text-align: center;
`
