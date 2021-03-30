import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
import getLevels from '../services/getLevels'

const STORAGE_KEY = 'levels'

export default function useLevels(userData) {
  const [levels, setLevels] = useState([])
  const { token } = userData

  useEffect(() => {
    async function initfetch() {
      const storedLevels = await getLocalStorage('levels')
      if (token && !storedLevels) {
        const fetchedLevels = await getLevels(token)
        setLevels(fetchedLevels)
      } else {
        setLevels(storedLevels)
      }
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
    }
    fetchData()
  }, [levels]) // eslint-disable-line react-hooks/exhaustive-deps

  async function refreshLevels() {
    setLevels(await getLevels(token))
  }

  return { levels, refreshLevels }
}
