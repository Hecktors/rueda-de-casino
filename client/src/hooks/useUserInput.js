import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

useUserInput.propTypes = {
  settings: PropTypes.object.isRequired,
}

const initState = {
  selectedMoveIDs: [],
  speed: 2900,
  isSongActive: false,
}

export default function useUserInput(settings) {
  const [userInput, setUserInput] = useState(initState)
  const [speedPrevVal, setSpeedPrevVal] = useState(settings.speed)
  const hasNoChanges = JSON.stringify(userInput) === JSON.stringify(settings)
  const isInitState = JSON.stringify(userInput) === JSON.stringify(initState)
  const hasSpeedChanged = userInput.speed !== speedPrevVal
  const hasIsMutedChanged =
    userInput.isSongActive !== settings.isSongActive && !isInitState

  useEffect(() => {
    setUserInput(settings)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateUserInput(event) {
    const { name, value, checked } = event.target
    userInputHandler[name](value, checked)
  }

  const userInputHandler = {
    move: (value) => {
      const updatedMoveIDs = userInput.selectedMoveIDs.includes(value)
        ? userInput.selectedMoveIDs.filter((moveID) => moveID !== value)
        : [...userInput.selectedMoveIDs, value]
      setUserInput({ ...userInput, selectedMoveIDs: updatedMoveIDs })
    },
    speed: (value) => setUserInput({ ...userInput, speed: Number(value) }),
    songActive: (_, checked) =>
      setUserInput({ ...userInput, isSongActive: !checked }),
  }

  function handleInputReset() {
    setUserInput(initState)
    setSpeedPrevVal(initState.speed)
  }

  return [
    userInput,
    updateUserInput,
    handleInputReset,
    hasNoChanges,
    isInitState,
    hasSpeedChanged,
    hasIsMutedChanged,
  ]
}
