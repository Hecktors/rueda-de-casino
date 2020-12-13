import { useState, useEffect } from 'react'

const initState = {
  _id: null,
  name: 'test',
  levelName: 'level 2',
  bars: 2,
  videoUrl: '',
  videoStart: '',
}

export default function useUserInput(pensum, id, setIsLevelInputDisplayed) {
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
    const { name, value } = event.target
    if (name === 'levelName' && value === 'createLevel') {
      setUserInput({ ...userInput, levelName: '' })
      setIsLevelInputDisplayed(true)
    }
    if (name === 'levelName') {
    }
    setUserInput({ ...userInput, [name]: value })
  }

  return [userInput, updateUserInput, resetUserInput]
}
