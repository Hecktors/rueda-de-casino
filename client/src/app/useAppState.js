import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from './services/localStorage'

const STORAGE_KEY = 'appState'

const initState = {
  selectedMoveIDs: [],
  speed: 2900,
  isSongActive: true,
}

export default function useAppState(pensum) {
  const [appState, setAppState] = useState(initState)

  useEffect(() => {
    setAppState(getLocalStorage(STORAGE_KEY) ?? initState)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLocalStorage(STORAGE_KEY, appState)
  }, [appState])

  const selectedMoves = appState.selectedMoveIDs
    ? pensum
        .map((level) => level.moves)
        .flat(1)
        .filter((move) => appState.selectedMoveIDs.includes(move._id))
    : []

  function updateAppState(event) {
    const { name, value, checked } = event.target
    appStateHandler[name](value, checked)
  }

  const appStateHandler = {
    move: (value) => {
      const updatedMoveIDs = appState.selectedMoveIDs.includes(value)
        ? appState.selectedMoveIDs.filter((moveID) => moveID !== value)
        : [...appState.selectedMoveIDs, value]
      setAppState({ ...appState, selectedMoveIDs: updatedMoveIDs })
    },
    speed: (value) => setAppState({ ...appState, speed: Number(value) }),
    songActivity: (_, checked) => {
      setAppState({ ...appState, isSongActive: checked })
    },
  }

  function resetAppState() {
    setAppState(initState)
  }

  return [appState, selectedMoves, updateAppState, resetAppState]
}
