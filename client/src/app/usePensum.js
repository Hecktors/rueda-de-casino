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
    const newMove = await callAddMoveAPI(userInput)
    console.log(newMove)
    setPensum(await getPensum())
  }

  async function updateMove(userInput) {
    const updatedMove = await callUpdateMoveAPI(userInput)
    console.log(updatedMove)
    const updatedPensum = pensum.map((level) => {
      return {
        ...level,
        moves: level.moves.map((move) =>
          move._id === updatedMove.__id ? updatedMove : move
        ),
      }
    })
    console.log(updatedPensum)
    setPensum(updatedPensum)
  }

  return [pensum, addMove, updateMove]
}
