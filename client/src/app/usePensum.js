import { useEffect, useState } from 'react'
import { callAddMoveAPI, getPensum } from './services/handleAPIs'
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
    const updatedPensum = [...pensum]
    updatedPensum.forEach(level => {
      level.levelName === newMove.levelName && level.moves.push(newMove)
    })
    setPensum(updatedPensum)
   
  }


  return [pensum, addMove]
}
