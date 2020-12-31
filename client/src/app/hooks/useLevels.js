import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
// import getAudios from '../services/getAudios'
import getLevels from '../services/getLevels'

const STORAGE_KEY = 'levels'

export default function useLevels(userData) {
  const [levels, setLevels] = useState([])
  // const [audios, setAudios] = useState([])
  const { token } = userData

  useEffect(() => {
    async function initfetch() {
      if (token) {
        const fetchedLevels = await getLevels(token)
        setLevels(getLocalStorage('levels') || fetchedLevels)
        // !audios.length && setAudios(await getAudios(fetchedLevels))
      }
      // setLevels([])
    }
    initfetch()
  }, [userData]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    async function fetchData() {
      if (token) {
        const fetchedLevels = await getLevels(token)
        levels.length
          ? setLocalStorage(STORAGE_KEY, fetchedLevels)
          : localStorage.removeItem(STORAGE_KEY)
      }
      // setAudios(await getAudios(fetchedLevels))
    }
    fetchData()
  }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps

  async function refreshLevels() {
    setLevels(await getLevels(token))
  }

  return { levels, refreshLevels }
}
