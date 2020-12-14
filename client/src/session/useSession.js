import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import getRandomMove from './services/getRandomMove'
import musicUrl from './assets/Uno_dos_tres.mp3'

useSession.propTypes = {
  moves: PropTypes.array.isRequired,
  speed: PropTypes.number,
  isSongActive: PropTypes.bool.isRequired,
}

export default function useSession(
  history,
  moves,
  audios,
  speed,
  isSongActive
) {
  const [currentMove, setCurrentMove] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)
  const musicAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    !moves && history.push('/')
    if (isSongActive) {
      musicAudioRef.current = new Audio(musicUrl)
      musicAudioRef.current.volume = 0.3
    }
    sessionHandler.play()
    return () => clearTimeout(timeoutRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sessionHandler = {
    play: () => {
      isSongActive && musicAudioRef.current.play()
      startTimeout(5000)
      setIsPlaying(true)
    },
    pause: () => {
      isSongActive && musicAudioRef.current.pause()
      stopMoveAudioProcess()
      setCurrentMove({})
      setIsPlaying(false)
    },
    stop: () => {
      if (isSongActive) {
        musicAudioRef.current.currentTime = 0
      }
      history.push('/')
    },
  }

  function startTimeout(ms) {
    timeoutRef.current = setTimeout(() => {
      const newCurrentMove = getRandomMove(moves)
      setCurrentMove(newCurrentMove)
      const audio = audios.find((audio) => audio.moveID === newCurrentMove._id)
        .audioElement
      audio.play()
      timeoutRef.current = null
      startTimeout(newCurrentMove.bars * speed + speed)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }
  return [sessionHandler, isPlaying, currentMove]
}
