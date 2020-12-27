import { useState, useEffect } from 'react'
import { setLocalStorage } from '../lib/localStorage'
import { getUser, validateToken } from '../services/userAPIs'

export default function useUser() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  })

  useEffect(() => {
    async function initfetch() {
      let token = JSON.parse(localStorage.getItem('auth-token'))
      if (token === null) {
        localStorage.setItem('auth-token', '')
        token = ''
      }
      const tokenRes = await validateToken(token)
      if (tokenRes) {
        const userRes = await getUser(token)
        setUserData({
          token,
          user: userRes,
        })
      }
    }
    initfetch()
  }, [])

  useEffect(() => {
    setLocalStorage('auth-token', userData.token)
  }, [userData])

  return { userData, setUserData }
}
