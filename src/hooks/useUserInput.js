import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

useUserInput.propTypes = {
  settings: PropTypes.object.isRequired,
}

const initState = {
  moveIDs: [],
  speed: 2900,
  isMuted: false,
}

export default function useUserInput(settings) {
  const [userInput, setUserInput] = useState(initState)
  const [speedPrevVal, setSpeedPrevVal] = useState(settings.speed)
  const hasNoChanges = JSON.stringify(userInput) === JSON.stringify(settings)
  const isInitState = JSON.stringify(userInput) === JSON.stringify(initState)
  const hasSpeedChanged = userInput.speed !== speedPrevVal
  const hasIsMutedChanged =
    userInput.isMuted !== settings.isMuted && !isInitState

  useEffect(() => {
    setUserInput(settings)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateUserInput(event) {
    const { name, value, checked } = event.target
    userInputHandler[name](value, checked)
  }

  const userInputHandler = {
    move: (value) => {
      const updatedMoveIDs = userInput.moveIDs.includes(value)
        ? userInput.moveIDs.filter((moveID) => moveID !== value)
        : [...userInput.moveIDs, value]
      setUserInput({ ...userInput, moveIDs: updatedMoveIDs })
    },
    speed: (value) => setUserInput({ ...userInput, speed: Number(value) }),
    mute: (_, checked) => setUserInput({ ...userInput, isMuted: !checked }),
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
