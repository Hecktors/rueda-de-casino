import { useState, useEffect } from 'react'

export default function useUserInput(pensum, id, setIsNewLevelSelected) {
  const initState = {
    _id: null,
    moveName: '',
    levelName: pensum.length ? pensum[0].levelName : '',
    bars: '',
    videoUrl: '',
    videoStart: '',
  }
  const [userInput, setUserInput] = useState(initState)
  const hasNoChanges = JSON.stringify(userInput) === JSON.stringify(initState)
  const isValid = userInput.moveName && userInput.levelName && userInput.bars

  useEffect(() => {
    const move = pensum
      .map((level) => level.moves)
      .flat()
      .find((move) => move._id === id)
    move &&
      setUserInput({
        _id: move._id,
        moveName: move.moveName,
        levelName: move.levelName,
        bars: move.bars,
        videoUrl: move.videoUrl,
        videoStart: move.videoStart,
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function resetUserInput() {
    setUserInput(initState)
    setIsNewLevelSelected(false)
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
