import { useState, useEffect } from 'react'
import checkRegisterInput from '../lib/checkRegisterInput'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
import {
  fetchUser,
  fetchUserLogin,
  fetchUserRegister,
  fetchTokenVerification,
  fetchUserAccountDelete,
} from '../services/userAPIs'

export default function useAuth(error, setError) {
  const [authData, setAuthData] = useState({})

  useEffect(() => {
    async function initfetch() {
      const storedToken = JSON.parse(localStorage.getItem('auth-token'))
      if (!storedToken) {
        return
      }
      const tokenRes = await fetchTokenVerification(storedToken)
      if (tokenRes) {
        const userResponse = await fetchUser(storedToken)
        setAuthData({
          token: storedToken,
          user: userResponse,
        })
      }
    }
    initfetch()
  }, [])

  useEffect(() => {
    if (authData.token) {
      const storedToken = getLocalStorage('auth-token')
      storedToken !== authData.token &&
        setLocalStorage('auth-token', authData.token)
    }
  }, [authData.token])

  // Login User
  async function loginUser(loginData) {
    if (!loginData.email || !loginData.password) {
      setError('All required field have to been filled.')
      return
    }

    const loginResponse = await fetchUserLogin(loginData)

    if (loginResponse.status !== 200) {
      setError(loginResponse.data.msg)
    } else {
      error && setError('')
      setAuthData(loginResponse.data)
    }
  }

  // Register User
  async function registerUser(userInput) {
    const validation = checkRegisterInput(userInput)

    if (!validation.result) {
      setError(validation.msg)
      return
    }
    const registerResponse = await fetchUserRegister(userInput)
    if (registerResponse.status !== 200) {
      setError(registerResponse.data.msg)
    } else {
      loginUser(userInput)
    }
  }

  // Logout User
  function logoutUser() {
    localStorage.removeItem('auth-token')
    setAuthData({})
  }

  // Delete User
  async function deleteUserAccount() {
    const deleteResponse = await fetchUserAccountDelete(authData.token)
    if (deleteResponse.status === 200) {
      localStorage.clear()
      logoutUser()
    }
  }

  return { authData, registerUser, loginUser, logoutUser, deleteUserAccount }
}
