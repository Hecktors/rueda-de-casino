import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import musicUrl from './assets/audio/music/Uno_dos_tres.mp3'
import movesData from './moves.json'
import MoveList from './components/MoveList'
import CurrentMove from './components/CurrentMove'

export default function App() {
  const [appState, setAppState] = useState('default')
  const [currentMove, setCurrentMove] = useState({})
  const musicAudioRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    musicAudioRef.current = new Audio(musicUrl)
    return () => clearInterval(intervalRef.current)
  }, [])

  const moves = movesData
  const isPlaying = appState === 'playing'
  const isPaused = appState === 'paused'
  const hasCurrentMove = currentMove.hasOwnProperty('id')

  const title =
    appState === 'default'
      ? 'Rueda De Casino'
      : appState === 'playing'
      ? 'Bailamos!!!'
      : 'Pause'

  function startOrPauseSession() {
    if (isPlaying) {
      musicAudioRef.current.pause()
      stopMoveInterval()
      setCurrentMove({})
      setAppState('paused')
    } else {
      musicAudioRef.current.play()
      startMoveInterval()
      setAppState('playing')
    }
  }

  function stopSession() {
    musicAudioRef.current.currentTime = 0
    setAppState('default')
  }

  function getRandomMove() {
    const movesNum = moves.length
    const randomNum = Math.floor(Math.random() * movesNum)
    return moves[randomNum]
  }

  function startMoveInterval() {
    intervalRef.current = setInterval(() => {
      setCurrentMove(getRandomMove)
    }, 10000)
  }

  function stopMoveInterval() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  return (
    <Container>
      <Header
        title={title}
        isPaused={isPaused}
        // appState={appState}
        handleClick={stopSession}
      />
      <main>
        {!isPlaying && <MoveList moves={moves} />}
        {hasCurrentMove && <CurrentMove name={currentMove.name} />}
      </main>
      <footer>
        <MainButton appState={appState} handleClick={startOrPauseSession} />
      </footer>
    </Container>
  )
}

const Container = styled.div`
  max-width: 450px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 80px auto 80px;
  height: 100%;
  color: var(--text-color);

  main {
    display: grid;
    place-items: center;
    overflow: scroll;
  }

  footer {
    width: 100%;
    text-align: center;
  }
`
