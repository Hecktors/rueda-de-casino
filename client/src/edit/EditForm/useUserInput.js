import { useState, useEffect } from 'react'

export default function useUserInput(
  move,
  setIsNewLevelSelected,
  initLevelName,
  hasNoLevels
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
    if (move) {
      setUserInput({
        _id: move._id,
        name: move.name,
        levelName: move.levelName,
        bars: move.bars,
        videoUrl: move.videoUrl,
        videoStart: move.videoStart,
      })
    } else {
      setUserInput(initState)
    }
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

  return [
    userInput,
    updateUserInput,
    resetUserInput,
    openNewLevelInput,
    hasNoChanges,
    isValid,
  ]
}
