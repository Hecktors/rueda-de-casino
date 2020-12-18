import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import getRandomArrayElement from '../app/lib/getRandomArrayElement'
import musicUrl from './assets/Uno_dos_tres.mp3'

const songVolume = 0.2
const moveVolume = 0.8
const callsStart = 5000

useSession.propTypes = {
  moves: PropTypes.array.isRequired,
  audios: PropTypes.array.isRequired,
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
  const [isMoveDisplayed, setIsMoveDisplayed] = useState(false)

  const musicAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    !moves && history.push('/')
    if (isSongActive) {
      musicAudioRef.current = new Audio(musicUrl)
      musicAudioRef.current.volume = songVolume
    }
    sessionHandler.play()
    return () => clearTimeout(timeoutRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sessionHandler = {
    play: () => {
      isSongActive && musicAudioRef.current.play()
      startTimeout(callsStart)
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
      const newCurrentMove = getRandomArrayElement(moves)
      setCurrentMove(newCurrentMove)
      setIsMoveDisplayed(true)
      playAudio(newCurrentMove._id)
      timeoutRef.current = null
      startTimeout(newCurrentMove.bars * speed + speed)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }

  function playAudio(moveID) {
    const moveAudio = audios.find((audio) => audio.moveID === moveID)
      .audioElement
    moveAudio.volume = moveVolume
    moveAudio.play()
  }

  return [
    sessionHandler,
    isPlaying,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
  ]
}
