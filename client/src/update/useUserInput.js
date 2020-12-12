import { useState, useEffect } from 'react'

const initState = {
  name: '',
  levelName: '',
  bars: 0,
  videoUrl: '',
  videoStart: '',
}

export default function useUserInput(levels, id, setIsLevelInputDisplayed) {
  const [userInput, setUserInput] = useState({})

  useEffect(() => {
    const move = levels
      .map((level) => level.moves)
      .flat()
      .find((move) => move.id === id)
    setUserInput(move)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function resetUserInput() {
    setUserInput(initState)
  }

  function updateUserInput(event) {
    const { name, value } = event.target
    if (name === 'levelName' && value === 'createLevel') {
      setUserInput({ ...userInput, levelName: '' })
      setIsLevelInputDisplayed(true)
      return
    }
    if (name === 'levelName') {
      setIsLevelInputDisplayed(false)
    }
    setUserInput({ ...userInput, [name]: value })
  }

  return [userInput, updateUserInput, resetUserInput]
}
