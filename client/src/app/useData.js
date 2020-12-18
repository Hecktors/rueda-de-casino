import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from './lib/localStorage'
import getAudios from './services/getAudios'
import {
  fetchGetPensum,
  fetchAddMove,
  fetchUpdateMove,
  fetchDeleteMove,
} from './services/handleAPIs'

const STORAGE_KEY = 'pensum'

export default function useAppState(levels) {
  const [pensum, setPensum] = useState([])
  const [audios, setAudios] = useState([])
  const history = useHistory()

  useEffect(() => {
    async function initfetch() {
      const fetchedPensum = await fetchGetPensum()
      setPensum(getLocalStorage('pensum') || fetchedPensum)
      // setPensum([])
      !audios.length && setAudios(await getAudios(fetchedPensum))
    }
    initfetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function fetchData() {
      const fetchedPensum = await fetchGetPensum()
      pensum.length
        ? setLocalStorage(STORAGE_KEY, fetchedPensum)
        : localStorage.removeItem(STORAGE_KEY)
      setAudios(await getAudios(fetchedPensum))
    }
    fetchData()
  }, [pensum])

  async function addMove(userInput) {
    await fetchAddMove(userInput)
    setPensum(await fetchGetPensum())
    history.push('/edit-overview')
  }

  async function updateMove(userInput) {
    await fetchUpdateMove(userInput)
    setPensum(await fetchGetPensum())
    history.push('/edit-overview')
  }

  async function deleteMove(id) {
    await fetchDeleteMove(id)
    setPensum(await fetchGetPensum())
    history.push('/edit-overview')
  }

  return [pensum, addMove, updateMove, deleteMove, audios]
}
