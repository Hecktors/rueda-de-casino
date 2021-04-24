import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'

const STORAGE_KEY = 'appState'

const initState = {
  selectedMoveIds: [],
  speed: 2900,
  noRepetition: true,
  isSongActive: true,
}

export default function useAppState(levels) {
  const [appState, setAppState] = useState(initState)

  const selectedMoves = levels
    ? levels
        .map((level) => level.moves)
        .flat()
        .filter((move) => appState.selectedMoveIds.includes(move._id))
    : []

  useEffect(() => {
    async function initfetch() {
      const storedAppState = await getLocalStorage(STORAGE_KEY)
      setAppState(storedAppState || initState)
    }
    initfetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    JSON.stringify(appState) !== JSON.stringify(getLocalStorage('appState')) &&
      setLocalStorage(STORAGE_KEY, appState)
  }, [appState])

  return { selectedMoves, appState, setAppState }
}
