import { useState, useEffect, useRef } from 'react'
import getRandomArrayElement from '../app/lib/getRandomArrayElement'
import musicUrl from './assets/Uno_dos_tres.mp3'

const songVolume = 0.2
const moveVolume = 0.8
const callsStart = 5000

export default function useSession(history, levels, audios, appState) {
  const { selectedMoveIDs, isSongActive, speed } = appState
  const [currentMove, setCurrentMove] = useState({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMoveDisplayed, setIsMoveDisplayed] = useState(false)

  const selectedMoves = levels
    .map((level) => level.moves)
    .flat()
    .filter((move) => selectedMoveIDs.includes(move._id))

  const musicAudioRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (isSongActive) {
      musicAudioRef.current = new Audio(musicUrl)
      musicAudioRef.current.volume = songVolume
    }
    sessionHandler.play()
    return () => clearTimeout(timeoutRef.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sessionHandler = {
    play: () => {
      if (selectedMoveIDs.length) {
        isSongActive && musicAudioRef.current.play()
        startTimeout(callsStart)
        setIsPlaying(true)
      }
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
      const newCurrentMove = getRandomArrayElement(selectedMoves)
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
    selectedMoves,
    sessionHandler,
    isPlaying,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
  ]
}
