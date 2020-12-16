import { useState, useEffect } from 'react'

export default function useUserInput(pensum, id, setIsLevelInputDisplayed) {
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
    const { name, value } = event.target
    if (name === 'levelName' && value === 'new Level') {
      setIsLevelInputDisplayed(true)
    }
    if (name === 'levelName' && value !== 'new Level') {
      setIsLevelInputDisplayed(false)
    }

    if (name === 'new Level') {
      setUserInput({ ...userInput, levelName: value })
    } else {
      setUserInput({ ...userInput, [name]: value })
    }
  }

  return [userInput, updateUserInput, resetUserInput]
}
