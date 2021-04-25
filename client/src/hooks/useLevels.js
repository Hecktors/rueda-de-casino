import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
import getLevels from '../services/getLevels'

export default function useLevels() {
  const [levels, setLevels] = useState([])
  const authToken = getLocalStorage('authToken')

  useEffect(() => {
    refreshLevels()
  }, [authToken]) // eslint-disable-line react-hooks/exhaustive-deps

  async function refreshLevels() {
    if (authToken) {
      const fetchedLevels = await getLevels(authToken)
      levels.length
        ? setLocalStorage(levels, fetchedLevels)
        : localStorage.removeItem(levels)
      setLevels(fetchedLevels)
    }
  }

  return { levels, refreshLevels }
}
