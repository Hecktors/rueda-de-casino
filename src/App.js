import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import musicUrl from './assets/audio/music/Uno dos tres.mp3'
import movesData from './moves.json'
import MoveList from './components/MoveList'
import CurrentMove from './components/CurrentMove'

export default function App() {
  // ===== HOOKS =====
  const [appState, setAppState] = useState('default')
  const [currentMove, setCurrentMove] = useState({})
  const musicAudioRef = useRef(null)
  const intervalRef = useRef(null)

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

  useEffect(() => {
    musicAudioRef.current = new Audio(musicUrl)
    return () => clearInterval(intervalRef.current)
  }, [])

  // ===== FUNCTIONS =====
  function tooglePlay() {
    if (isPlaying) {
      // User clicked pause
      musicAudioRef.current.pause()
      stopMoveInterval()
      setCurrentMove({})
      setAppState('paused')
    } else {
      // User clicked play
      musicAudioRef.current.play()
      startMoveInterval()
      setAppState('playing')
    }
  }

  // User clicked stop
  function stopPlay() {
    musicAudioRef.current.currentLength = 0
    setAppState('default')
  }

  // Get random move form moves array
  function getRandomMove() {
    const movesNum = moves.length
    const randomNum = Math.floor(Math.random() * movesNum)
    return moves[randomNum]
  }

  //
  function startMoveInterval() {
    intervalRef.current = setInterval(() => {
      setCurrentMove(getRandomMove)
    }, 5000)
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
        appState={appState}
        handleClick={stopPlay}
      />
      <main>
        {!isPlaying && <MoveList moves={moves} />}
        {hasCurrentMove && <CurrentMove title={currentMove.title} />}
      </main>
      <footer>
        <MainButton appState={appState} handleClick={tooglePlay} />
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
