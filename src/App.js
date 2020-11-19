import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import musicUrl from './assets/audio/music/Uno dos tres.mp3'
import movesData from './moves.json'
import MoveList from './components/MoveList'

export default function App() {
  const [appState, setAppState] = useState('default')
  const musicRef = useRef(null)
  const isPlaying = appState === 'playing'
  const moves = movesData

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
    <AppStyled>
      <Header appState={appState} handleClick={stopPlaying} />
      <main>{!isPlaying && <MoveList moves={moves} />}</main>
      <footer>
        <MainButton appState={appState} handleClick={toogleMusicPlay} />
      </footer>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  display: grid;
  grid-template-rows: 80px auto 80px;
  height: 100%;
  color: var(--text-color);

  main {
    /* display: grid; */
    /* place-items: center; */
  }

  footer {
    width: 100%;
    text-align: center;
  }
`
