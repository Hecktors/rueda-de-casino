import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import musicUrl from './assets/audio/music/Uno_dos_tres.mp3'
import pensum from './data/pensum.json'
import MoveList from './components/MoveList'
import CurrentMove from './components/CurrentMove'
import Settings from './components/Settings'

export default function App() {
  const [appState, setAppState] = useState('settings')
  const [currentMove, setCurrentMove] = useState({})
  const [selectedMoves, setSelectedMoves] = useState([])
  const musicAudioRef = useRef(null)
  const moveAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  const isSessionRunning = appState === 'playing'
  const isSessionPaused = appState === 'paused'
  const isSettingsOpen = appState === 'settings'
  const isMoveListDisplay = !isSessionRunning && !isSettingsOpen
  const hasCurrentMove = currentMove.hasOwnProperty('id')

  useEffect(() => {
    musicAudioRef.current = new Audio(musicUrl)
    musicAudioRef.current.volume = 0.3
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const title =
    appState === 'default'
      ? 'Rueda De Casino'
      : appState === 'playing'
      ? 'Bailamos!!!'
      : 'Pause'

  function startOrPauseSession() {
    if (isSessionRunning) {
      musicAudioRef.current.pause()
      stopMoveAudioProcess()
      setCurrentMove({})
      setAppState('paused')
    } else {
      musicAudioRef.current.play()
      startMoveTimeout(1000)
      setAppState('playing')
    }
  }

  function stopSession() {
    musicAudioRef.current.currentTime = 0
    setAppState('default')
  }

  function getRandomMove() {
    const movesNum = selectedMoves.length
    const randomNum = Math.floor(Math.random() * movesNum)
    return selectedMoves[randomNum]
  }

  function startMoveTimeout(ms) {
    timeoutRef.current = setTimeout(() => {
      console.log('################setTimeout!')
      const nextCurrentMove = getRandomMove()
      setCurrentMove(nextCurrentMove)
      moveAudioRef.current = new Audio(`./moves/${nextCurrentMove.filename}`)
      moveAudioRef.current.play()
      timeoutRef.current = null
      startMoveTimeout(nextCurrentMove.steps * 1000)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    moveAudioRef.current = null
  }

  function updateSelectedMoves(moveIds) {
    console.log('update:', moveIds)
  }

  return (
    <Container>
      <Header
        title={title}
        isPaused={isSessionPaused}
        handleClick={stopSession}
      />
      <main>
        {isMoveListDisplay && (
          <MoveList moves={selectedMoves} isPaused={isSessionPaused} />
        )}
        {hasCurrentMove && <CurrentMove name={currentMove.name} />}
        {isSettingsOpen && (
          <Settings pensum={pensum} updateSelectedMoves={updateSelectedMoves} />
        )}
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
    overflow: auto;
  }

  footer {
    width: 100%;
    text-align: center;
  }
`
