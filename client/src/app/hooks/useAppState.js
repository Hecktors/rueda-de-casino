import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'

const STORAGE_KEY = 'appState'

const initState = {
  selectedMoveIDs: [],
  speed: 2900,
  isSongActive: true,
}

export default function useAppState(moves) {
  const [appState, setAppState] = useState(initState)
  const [error, setError] = useState('')

  const selectedMoves =
    moves &&
    moves
      .map((level) => level.moves)
      .flat()
      .filter((move) => appState.selectedMoveIDs.includes(move._id))

  useEffect(() => {
    async function initfetch() {
      const storedData = await getLocalStorage(STORAGE_KEY)
      setAppState(storedData || initState)
    }
    initfetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    JSON.stringify(appState) !== JSON.stringify(getLocalStorage('appState')) &&
      setLocalStorage(STORAGE_KEY, appState)
  }, [appState])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }, [error])

  return { selectedMoves, appState, setAppState, error, setError }
}
