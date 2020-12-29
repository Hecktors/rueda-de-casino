import { useState, useEffect } from 'react'

export default function useUserInput(pensum, id, setIsNewLevelSelected) {
  const initState = {
    _id: null,
    moveName: '',
    levelName: pensum.length ? pensum[0].name : '',
    bars: '',
    videoUrl: '',
    videoStart: '',
  }
  const [userInput, setUserInput] = useState(initState)
  const hasNoChanges = JSON.stringify(userInput) === JSON.stringify(initState)
  const isValid = userInput.moveName && userInput.levelName && userInput.bars
  console.log(userInput.levelName)

  useEffect(() => {
    let levelName, move
    pensum.forEach((level) =>
      level.moves.forEach((moveItem) => {
        if (moveItem._id === id) {
          levelName = level.name
          move = moveItem
        }
      })
    )

    move &&
      setUserInput({
        _id: move._id,
        moveName: move.name,
        levelName: levelName,
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
