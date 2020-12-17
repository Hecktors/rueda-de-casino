import { useState, useEffect } from 'react'

export default function useUserInput(pensum, id, setIsNewLevelSelected) {
  const initState = {
    _id: null,
    name: '',
    levelName: pensum.length ? pensum[0].levelName : '',
    bars: '',
    videoUrl: '',
    videoStart: '',
  }
  const [userInput, setUserInput] = useState(initState)

  useEffect(() => {
    const move = pensum
      .map((level) => level.moves)
      .flat()
      .find((move) => move._id === id)
    move &&
      setUserInput({
        _id: move._id,
        name: move.name,
        levelName: move.levelName,
        bars: move.bars,
        videoUrl: move.videoUrl,
        videoStart: move.videoStart,
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function resetUserInput() {
    setUserInput(initState)
  }

  function updateUserInput(event) {
    const key =
      event.target.name === 'newLevel' ? 'levelName' : event.target.name
    key === 'levelName' && setIsNewLevelSelected(false)
    setUserInput({ ...userInput, [key]: event.target.value })
  }

  function openNewLevelInput() {
    setIsNewLevelSelected(true)
    setUserInput({ ...userInput, levelName: '' })
  }

  return [userInput, updateUserInput, resetUserInput, openNewLevelInput]
}
