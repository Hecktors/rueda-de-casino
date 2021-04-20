import { useState, useEffect } from 'react'

export default function useError() {
  const [error, setError] = useState('')

  useEffect(() => {
    let timeoutId
    if (error) {
      timeoutId = setTimeout(() => {
        setError('')
      }, 5000)
    }
    return () => clearTimeout(timeoutId)
  }, [error])

  return { error, setError }
}
