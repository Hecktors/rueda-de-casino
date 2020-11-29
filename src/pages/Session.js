import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as StopIcon } from '../assets/img/stop-circle.svg'
import { ReactComponent as PlayIcon } from '../assets/img/play.svg'
import { ReactComponent as PauseIcon } from '../assets/img/pause.svg'
import musicUrl from '../assets/audio/music/Uno_dos_tres.mp3'
import Layout from '../components/UI/Layout'
import Header from '../components/Header'
import Button from '../components/Button'
import MoveList from '../components/MoveList'
import CurrentMove from '../components/CurrentMove'
import getRandomMove from '../lib/getRandomMove'
import Video from '../components/Video'

Session.propTypes = {
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isMuted: PropTypes.bool.isRequired,
}

export default function Session({ history, moves, speed, isMuted }) {
  const [currentMove, setCurrentMove] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [video, setVideo] = useState({})

  const musicAudioRef = useRef(null)
  const moveAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  const hasCurrentMove = currentMove && currentMove.hasOwnProperty('id')

  useEffect(() => {
    if (!isMuted) {
      musicAudioRef.current = new Audio(musicUrl)
      musicAudioRef.current.volume = 0.3
    }
    return () => clearTimeout(timeoutRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    moves.length > 0 && startPlaying()
  }, [moves]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSession() {
    isPlaying ? stopPlaying() : startPlaying()
  }

  function startPlaying() {
    !isMuted && musicAudioRef.current.play()
    startMoveTimeout(5000)
    setIsPlaying(true)
  }

  function stopPlaying() {
    !isMuted && musicAudioRef.current.pause()
    stopMoveAudioProcess()
    setCurrentMove({})
    setIsPlaying(false)
  }

  function stopSession() {
    if (!isMuted) {
      musicAudioRef.current.currentTime = 0
    }
    history.push('/')
  }

  function startMoveTimeout(ms) {
    timeoutRef.current = setTimeout(() => {
      const nextCurrentMove = getRandomMove(moves)
      setCurrentMove(nextCurrentMove)
      moveAudioRef.current = new Audio(
        `./assets/audio/moves/${nextCurrentMove.filename}`
      )
      console.log(speed, nextCurrentMove.steps)
      moveAudioRef.current.play()
      timeoutRef.current = null
      startMoveTimeout(nextCurrentMove.steps * speed + speed)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    moveAudioRef.current = null
  }

  return (
    <Layout>
      {video.id && <Video video={video} onClick={() => setVideo({})} />}
      <Header>
        <div />
        {isPlaying ? (
          <>
            <div />
            <div />
          </>
        ) : (
          <>
            <h1>Pause</h1>
            <Button onClick={stopSession} isSmall>
              <StopIcon />
            </Button>
          </>
        )}
      </Header>
      <main>
        {hasCurrentMove && (
          <>
            <CurrentMove name={currentMove.name} />
          </>
        )}
        {!isPlaying && <MoveList moves={moves} onClick={setVideo} />}
      </main>
      <footer>
        <Button onClick={handleSession}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </footer>
    </Layout>
  )
}
