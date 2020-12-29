import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
import getAudios from '../services/getAudios'
import { getPensum } from '../services/pensumAPIs'

const STORAGE_KEY = 'pensum'

export default function usePensum(userData) {
  const [pensum, setPensum] = useState([])
  const [audios, setAudios] = useState([])
  const { token } = userData

  console.log(userData)

  useEffect(() => {
    async function initfetch() {
      if (token) {
        const fetchedPensum = await getPensum(token)
        console.log(fetchedPensum)
        setPensum(getLocalStorage('pensum') || fetchedPensum)
        // !audios.length && setAudios(await getAudios(fetchedPensum))
      }
      // setPensum([])
    }
    initfetch()
  }, [userData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function fetchData() {
      const fetchedPensum = await getPensum(token)
      pensum.length
        ? setLocalStorage(STORAGE_KEY, fetchedPensum)
        : localStorage.removeItem(STORAGE_KEY)
      setAudios(await getAudios(fetchedPensum))
    }
    fetchData()
  }, [pensum])

  async function refreshPensum() {
    setPensum(await getPensum)
  }

  return { pensum, refreshPensum, audios }
}
