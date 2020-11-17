import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import audioUrl from './assets/audio/music/Uno dos tres.mp3'

function App() {
  // Hooks
  const [appState, setAppState] = useState('default')
  const songRef = useRef(null)
  // Constans
  const btnTask = appState === 'playing' ? 'pause' : 'play'

  // UseEffect
  useEffect(() => {
    songRef.current = new Audio(audioUrl)
  }, [])

  useEffect(() => {
    if (appState === 'default' || appState === 'pausing') {
      songRef.current.pause()
    } else {
      songRef.current.play()
    }
  }, [appState])

  // Functions
  function playSong(btnState) {
    setAppState(btnState === 'play' ? 'playing' : 'pausing')
  }

  return (
    <AppStyled>
      <Header title="Rueda De Salsa" />
      <main></main>
      <FooterStyled>
        <MainButton task={btnTask} handleClick={playSong} />
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
