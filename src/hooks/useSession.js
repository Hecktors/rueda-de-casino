import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import getRandomMove from '../services/getRandomMove'
import musicUrl from '../assets/audio/music/Uno_dos_tres.mp3'

useSession.propTypes = {
  history: PropTypes.object.isRequired,
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isMuted: PropTypes.bool.isRequired,
}

export default function useSession(history, moves, speed, isMuted) {
  const [currentMove, setCurrentMove] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)
  const musicAudioRef = useRef(null)
  const moveAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    !moves && history.push('/')
    if (!isMuted) {
      musicAudioRef.current = new Audio(musicUrl)
      musicAudioRef.current.volume = 0.3
      musicAudioRef.current.play()
    }
    sessionHandler.play()
    return () => clearTimeout(timeoutRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sessionHandler = {
    play: () => {
      !isMuted && musicAudioRef.current.play()
      startTimeout(5000)
      setIsPlaying(true)
    },
    pause: () => {
      !isMuted && musicAudioRef.current.pause()
      stopMoveAudioProcess()
      setCurrentMove({})
      setIsPlaying(false)
    },
    stop: () => {
      if (!isMuted) {
        musicAudioRef.current.currentTime = 0
      }
      history.push('/')
    },
  }

  function startTimeout(ms) {
    timeoutRef.current = setTimeout(() => {
      const nextCurrentMove = getRandomMove(moves)
      setCurrentMove(nextCurrentMove)
      moveAudioRef.current = new Audio(
        `./assets/audio/moves/${nextCurrentMove.filename}`
      )
      moveAudioRef.current.play()
      timeoutRef.current = null
      startTimeout(nextCurrentMove.steps * speed + speed)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    moveAudioRef.current = null
  }
  return [sessionHandler, isPlaying, currentMove]
}
