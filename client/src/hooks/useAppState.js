import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'

const DEFAULT_STATE = {
  selectedMoveIds: [],
  speed: 2900,
  noRepetition: true,
  isSongActive: true,
}

export default function useAppState(levels) {
  const [appState, setAppState] = useState(DEFAULT_STATE)

  const selectedMoves = levels
    ? levels
        .map((level) => level.moves)
        .flat()
        .filter((move) => appState.selectedMoveIds.includes(move._id))
    : []

  useEffect(() => {
    const storedAppState = getLocalStorage('appState')
    if (
      storedAppState &&
      JSON.stringify(storedAppState) !== JSON.stringify(appState)
    ) {
      setAppState(storedAppState)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    JSON.stringify(appState) !== JSON.stringify(getLocalStorage('appState')) &&
      setLocalStorage('appState', appState)
  }, [appState])

  return { selectedMoves, appState, setAppState }
}
