import styled from 'styled-components/macro'
import { useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import MainButton from './components/MainButton'
import musicUrl from './assets/audio/music/Uno_dos_tres.mp3'
import pensum from './data/pensum.json'
import MoveList from './components/MoveList'
import CurrentMove from './components/CurrentMove'
import Settings from './components/Settings'
import getLocalStorage from './components/lib/getLocalStorage'
import setLocalStorage from './components/lib/setLocalStorage'

export default function App() {
  const [appState, setAppState] = useState('home')
  const [currentMove, setCurrentMove] = useState({})
  const [selectedMoves, setSelectedMoves] = useState([])
  const musicAudioRef = useRef(null)
  const moveAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  const isStartMode = appState === 'home'
  const isSessionPlayMode = appState === 'sessionPlay'
  const isSessionPauseMode = appState === 'sessionPause'
  const isSettingsMode = appState === 'settings'

  const isMoveListDisplayed = isStartMode || isSessionPauseMode
  const hasCurrentMove = currentMove.hasOwnProperty('id')
  const isNoReady = selectedMoves.length < 2

  useEffect(() => {
    setSelectedMoves(getLocalStorage('selectedMoves') ?? [])
    musicAudioRef.current = new Audio(musicUrl)
    musicAudioRef.current.volume = 0.3
    return () => clearTimeout(timeoutRef.current)
  }, [])

  function handleSession() {
    if (isSessionPlayMode) {
      musicAudioRef.current.pause()
      stopMoveAudioProcess()
      setCurrentMove({})
      setAppState('sessionPause')
    } else {
      musicAudioRef.current.play()
      startMoveTimeout(5000)
      setAppState('sessionPlay')
    }
  }

  function stopSession() {
    musicAudioRef.current.currentTime = 0
    setAppState('home')
  }

  function toggleSettings() {
    setAppState(appState === 'home' ? 'settings' : 'home')
  }

  function getRandomMove() {
    const movesNum = selectedMoves.length
    const randomNum = Math.floor(Math.random() * movesNum)
    return selectedMoves[randomNum]
  }

  function startMoveTimeout(ms) {
    timeoutRef.current = setTimeout(() => {
      const nextCurrentMove = getRandomMove()
      setCurrentMove(nextCurrentMove)
      moveAudioRef.current = new Audio(`./moves/${nextCurrentMove.filename}`)
      moveAudioRef.current.play()
      timeoutRef.current = null
      startMoveTimeout(nextCurrentMove.steps * 2000 + 1000)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    moveAudioRef.current = null
  }

  function updateSelectedMoves(moveIds) {
    const updatedSelectedMoves = []
    pensum.forEach((level) =>
      level.moves.forEach(
        (move) => moveIds.includes(move.id) && updatedSelectedMoves.push(move)
      )
    )
    setSelectedMoves('selectedMoves', updatedSelectedMoves)
    setAppState('home')
    setLocalStorage(updatedSelectedMoves)
  }

  function deleleSelectedMoves() {
    setSelectedMoves([])
  }

  return (
    <Container>
      <Header
        appState={appState}
        stopSession={stopSession}
        toggleSettings={toggleSettings}
        deleleSelectedMoves={deleleSelectedMoves}
      />
      <main>
        {isMoveListDisplayed && (
          <MoveList moves={selectedMoves} isPaused={isSessionPauseMode} />
        )}
        {hasCurrentMove && <CurrentMove name={currentMove.name} />}
        {isSettingsMode && (
          <Settings
            pensum={pensum}
            selectedMoves={selectedMoves}
            updateSelectedMoves={updateSelectedMoves}
          />
        )}
      </main>
      <footer>
        <MainButton
          appState={appState}
          onClick={handleSession}
          isDisabled={isNoReady}
        />
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
    position: relative;
    display: grid;
    place-items: center;
    overflow: auto;
  }

  footer {
    width: 100%;
    text-align: center;
  }
`
