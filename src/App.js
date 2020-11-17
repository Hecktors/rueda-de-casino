import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import audioUrl from './assets/audio/music/Uno dos tres.mp3'

export default function App() {
  const [appState, setAppState] = useState('default')
  let songRef = useRef(null)

  useEffect(() => {
    songRef.current = new Audio(audioUrl)
    return () => {
      songRef.current = null
    }
  }, [])

  useEffect(() => {
    if (appState === 'default' || appState === 'paused') {
      songRef.current.pause()
    } else {
      songRef.current.play()
    }
  }, [appState])

  function toogleSongPlay() {
    setAppState(appState === 'playing' ? 'paused' : 'playing')
  }

  function stopPlaying() {
    songRef.current.currentTime = 0
    setAppState('default')
  }

  return (
    <AppStyled>
      <Header appState={appState} handleClick={stopPlaying} />
      <main></main>
      <footer>
        <MainButton appState={appState} handleClick={toogleSongPlay} />
      </footer>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: 80px auto 100px;
  height: 100%;
  font-family: Helvetica;
  font-size: 112.5%;
  color: var(--text-color);
  background-color: var(--primery-color);

  main {
    display: grid;
    place-items: center;
  }

  footer {
    width: 100%;
    text-align: center;
  }
`
