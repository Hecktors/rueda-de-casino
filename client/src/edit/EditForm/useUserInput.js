import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

useUserInput.propTypes = {
  move: PropTypes.array.isRequired,
  hasNoLevels: PropTypes.bool.isRequired,
  initLevelName: PropTypes.string.isRequired,
  setIsNewLevelSelected: PropTypes.func.isRequired
}

export default function useUserInput(
  move,
  hasNoLevels,
  initLevelName,
  setIsNewLevelSelected

) {
  const initState = {
    _id: '',
    name: '',
    levelName: initLevelName,
    bars: '',
    videoUrl: '',
    videoStart: '',
  }
  const [userInput, setUserInput] = useState(initState)
  const isValid = userInput.name && userInput.levelName && userInput.bars
  const hasNoChanges = move
    ? JSON.stringify(userInput) === JSON.stringify(move)
    : JSON.stringify(userInput) === JSON.stringify(initState)

  useEffect(() => {
    setInitState()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function setInitState() {
    setUserInput(move ? {
      _id: move._id,
      name: move.name,
      levelName: move.levelName,
      bars: move.bars,
      videoUrl: move.videoUrl,
      videoStart: move.videoStart,
    } : initState)
  }

  function resetUserInput() {
    setInitState()
    !hasNoLevels && setIsNewLevelSelected(false)
  }

  function updateUserInput(event) {
    event.target.name === 'levelName' && setIsNewLevelSelected(false)
    const key =
      event.target.name === 'newLevel' ? 'levelName' : event.target.name
    setUserInput({ ...userInput, [key]: event.target.value })
  }

  function openNewLevelInput() {
    setIsNewLevelSelected(true)
    setUserInput({ ...userInput, levelName: '' })
  }

  return {
    userInput,
    hasNoChanges,
    isValid,
    updateUserInput,
    resetUserInput,
    openNewLevelInput,
  }
}
