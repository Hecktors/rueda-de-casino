import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from './services/localStorage'
import {
  getAllAudios,
  updateAudios,
  deleteAudio,
} from './services/handleAudios'
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

      setPensum(getLocalStorage('pensum') || (await fetchGetPensum()))
      // setPensum(fetchedPensum)
      !audios.length && setAudios(await getAllAudios(fetchedPensum))
    }
    initfetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLocalStorage(STORAGE_KEY, pensum)
  }, [pensum])

  async function addMove(userInput) {
    const response = await fetchAddMove(userInput)
    response && setPensum(await fetchGetPensum())
    response && setAudios(await updateAudios(audios, response))
    history.push('/edit-overview')
  }

  async function updateMove(userInput) {
    const response = await fetchUpdateMove(userInput)
    response && setPensum(await fetchGetPensum())
    response && setAudios(await updateAudios(audios, response))
    history.push('/edit-overview')
  }

  async function deleteMove(id) {
    const response = await fetchDeleteMove(id)
    response && setPensum(await fetchGetPensum())
    response && setAudios(await deleteAudio(audios, response))
    history.push('/edit-overview')
  }

  return [pensum, addMove, updateMove, deleteMove, audios]
}
