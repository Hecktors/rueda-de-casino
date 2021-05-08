import { useEffect, useState } from 'react'
import { setLocalStorage } from '../lib/localStorage'
import getLevels from '../services/getLevels'

export default function useLevels(authToken) {
  const [levels, setLevels] = useState([])

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
