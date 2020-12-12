import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  getPensum,
  callAddMoveAPI,
  callUpdateMoveAPI,
  callDeleteMoveAPI,
} from './services/handleAPIs'
import { getLocalStorage, setLocalStorage } from './services/localStorage'

const STORAGE_KEY = 'pensum'

export default function useAppState(levels) {
  const [pensum, setPensum] = useState([])
  const history = useHistory()
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
    const response = await callAddMoveAPI(userInput)
    response && setPensum(await getPensum())
    history.push('/edit-overview')
  }

  async function updateMove(userInput) {
    const response = await callUpdateMoveAPI(userInput)
    response && setPensum(await getPensum())
    history.push('/edit-overview')
  }

  async function deleteMove(id) {
    const response = await callDeleteMoveAPI(id)
    response && setPensum(await getPensum())
    history.push('/edit-overview')
  }

  return [pensum, addMove, updateMove, deleteMove]
}
