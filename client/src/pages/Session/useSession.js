import { useState, useContext, useEffect, useRef } from 'react'
import { Context } from '../../context/Context'
import getRandomArrayElement from '../../lib/getRandomArrayElement'
const unoDosTresSong = new Audio('./assets/audio/Uno_dos_tres.mp3')

const songVolume = 0.2
const moveVolume = 0.8
const callsStart = 10000

export default function useSession(history) {
  const { levels, audios, appState } = useContext(Context)
  const { selectedMoveIds, isSongActive, speed, noRepetition } = appState

  const [currentMove, setCurrentMove] = useState({})
  const [isRunning, setIsRunning] = useState(null)
  const [isMoveDisplayed, setIsMoveDisplayed] = useState(false)

  const moveCallTimeoutRef = useRef(null)
  const moveCallSequence = useRef(null)
  const observerTimeoutRef = useRef(null)
  const musicAudioRef = useRef(null)

  const selectedMoves = levels
    .map((level) => level.moves)
    .flat()
    .filter((move) => selectedMoveIds.includes(move._id))

  useEffect(() => {
    moveCallSequence.current = selectedMoves
    setIsRunning(true)

    if (isSongActive) {
      musicAudioRef.current = unoDosTresSong
      musicAudioRef.current.volume = songVolume
      musicObserver()
    }
    return () => {
      clearTimeout(moveCallTimeoutRef.current)
      clearTimeout(observerTimeoutRef.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isRunning) {
      sessionHandler.play()
    } else {
      sessionHandler.pause()
    }
  }, [isRunning]) // eslint-disable-line react-hooks/exhaustive-deps

  function musicObserver() {
    observerTimeoutRef.current = setTimeout(() => {
      musicAudioRef.current.paused ? setIsRunning(false) : setIsRunning(true)
      musicObserver()
    }, [300])
  }

  const sessionHandler = {
    play: () => {
      if (selectedMoveIds.length) {
        isSongActive && musicAudioRef.current.play()
        startTimeout(callsStart)
      }
    },
    pause: () => {
      stopMoveAudioProcess()
      setCurrentMove({})
    },
    stop: () => {
      if (isSongActive) {
        musicAudioRef.current.currentTime = 0
      }
      history.push('/')
    },
  }

  function toogleSessionRun() {
    if (isSongActive) {
      musicAudioRef.current.paused
        ? musicAudioRef.current.play()
        : musicAudioRef.current.pause()
    } else {
      setIsRunning(!isRunning)
    }
  }

  function startTimeout(ms) {
    moveCallTimeoutRef.current = setTimeout(() => {
      const newCurrentMove = getNextMove()
      setCurrentMove(newCurrentMove)
      setIsMoveDisplayed(true)
      playAudio(newCurrentMove._id)
      startTimeout(newCurrentMove.bars * speed + speed)
    }, ms)
  }

  function stopMoveAudioProcess() {
    clearTimeout(moveCallTimeoutRef.current)
    moveCallTimeoutRef.current = null
  }

  function playAudio(moveId) {
    const moveAudio = audios.find((audio) => audio.moveId === moveId)
      .audioElement
    moveAudio.volume = moveVolume
    moveAudio.play()
  }

  function getNextMove() {
    const move = getRandomArrayElement(moveCallSequence.current)
    noRepetition && removeIdFromMoveCallSequence(move._id)
    return move
  }

  function removeIdFromMoveCallSequence(id) {
    moveCallSequence.current = moveCallSequence.current.filter(
      (move) => move._id !== id
    )
    if (!moveCallSequence.current.length)
      moveCallSequence.current = selectedMoves
  }

  return {
    selectedMoves,
    sessionHandler,
    isRunning,
    currentMove,
    isMoveDisplayed,
    setIsMoveDisplayed,
    toogleSessionRun,
  }
}
