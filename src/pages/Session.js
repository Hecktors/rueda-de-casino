import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as StopIcon } from '../assets/img/stop-circle.svg'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'
import musicUrl from '../assets/audio/music/Uno_dos_tres.mp3'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Button from '../components/Button'
import MoveList from '../components/MoveList'
import CurrentMove from '../components/CurrentMove'

Session.propTypes = { selectedMoves: PropTypes.array.isRequired }

export default function Session({ history, selectedMoves }) {
  const [currentMove, setCurrentMove] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const musicAudioRef = useRef(null)
  const moveAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  const hasCurrentMove = currentMove && currentMove.hasOwnProperty('id')

  useEffect(() => {
    musicAudioRef.current = new Audio(musicUrl)
    musicAudioRef.current.volume = 0.3
    return () => clearTimeout(timeoutRef.current)
  }, [])

  useEffect(() => {
    selectedMoves.length > 0 && startPlaying()
  }, [selectedMoves]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSession() {
    isPlaying ? stopPlaying() : startPlaying()
  }

  function startPlaying() {
    musicAudioRef.current.play()
    startMoveTimeout(5000)
    setIsPlaying(true)
  }

  function stopPlaying() {
    musicAudioRef.current.pause()
    stopMoveAudioProcess()
    setCurrentMove({})
    setIsPlaying(false)
  }

  function stopSession() {
    musicAudioRef.current.currentTime = 0
    history.push('/')
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
      moveAudioRef.current = new Audio(
        `./audio/moves/${nextCurrentMove.filename}`
      )
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

  return (
    <Layout>
      <Header title="Salsa time">
        <div />
        <div />
        {isPlaying ? (
          <div />
        ) : (
          <Button onClick={stopSession} isSmall>
            <StopIcon />
          </Button>
        )}
      </Header>
      <main>
        {hasCurrentMove && <CurrentMove name={currentMove.name} />}
        {!isPlaying && <MoveList moves={selectedMoves} />}
      </main>
      <footer>
        <Button onClick={handleSession}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </footer>
    </Layout>
  )
}
