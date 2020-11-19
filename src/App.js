import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import musicUrl from './assets/audio/music/Uno dos tres.mp3'

export default function App() {
  const [appState, setAppState] = useState('default')
  let musicRef = useRef(null)
  const isPaused = appState === 'paused'
  const title =
    appState === 'default'
      ? 'Rueda De Casino'
      : appState === 'playing'
      ? 'Bailamos!!!'
      : 'Pause'

  useEffect(() => {
    musicRef.current = new Audio(musicUrl)
  }, [])

  useEffect(() => {
    if (appState === 'default' || appState === 'paused') {
      musicRef.current.pause()
    } else {
      musicRef.current.play()
    }
  }, [appState])

  function toogleMusicPlay() {
    setAppState(appState === 'playing' ? 'paused' : 'playing')
  }

  function stopPlaying() {
    musicRef.current.currentTime = 0
    setAppState('default')
  }

  return (
    <Container>
      <Header
        title={title}
        isPaused={isPaused}
        appState={appState}
        handleClick={stopPlaying}
      />
      <main></main>
      <footer>
        <MainButton appState={appState} handleClick={toogleMusicPlay} />
      </footer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 80px auto 80px;
  height: 100%;
  color: var(--text-color);

  main {
    display: grid;
    place-items: center;
  }

  footer {
    width: 100%;
    text-align: center;
  }
`
