import { useState, useEffect } from 'react'
import { getUser, validateToken } from '../services/handleAPIs'

export default function useUser() {
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  })

  useEffect(() => {
    async function initfetch() {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.setItem('auth-token', '')
        token = ''
      }
      const tokenRes = await validateToken(token)
      console.log(tokenRes)
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

  return [userData, setUserData]
}
