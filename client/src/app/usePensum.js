import { useEffect, useState } from 'react'
import {
  callAddMoveAPI,
  callUpdateMoveAPI,
  getPensum,
} from './services/handleAPIs'
import { getLocalStorage, setLocalStorage } from './services/localStorage'

const STORAGE_KEY = 'pensum'

export default function useAppState(levels) {
  const [pensum, setPensum] = useState([])

  useEffect(() => {
    async function fetchCall() {
      setPensum(await getPensum())
    }
    fetchCall()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLocalStorage(STORAGE_KEY, pensum)
  }, [pensum])

  async function addMove(userInput) {
    const updatedPensum = await callAddMoveAPI(userInput)
    console.log(updatedPensum)
    setPensum(updatedPensum)
  }

  async function updateMove(userInput) {
    const updatedPensum = await callUpdateMoveAPI(userInput)
    setPensum(updatedPensum)
  }

  return [pensum, addMove, updateMove]
}
