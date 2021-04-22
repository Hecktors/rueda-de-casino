import { useState, useEffect } from 'react'
import getInputErrors from '../lib/checkInputs'
import { getLocalStorage, setLocalStorage } from '../lib/localStorage'
import {
  fetchUser,
  fetchUserLogin,
  fetchUserRegister,
  fetchTokenVerification,
  fetchUserAccountDelete,
  fetchPasswordReset,
  fetchPasswordRenew,
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

  // Login user
  async function loginUser(userInput) {
    const inputErr = getInputErrors(userInput)
    if (inputErr) {
      setError(inputErr)
      return
    }

    const response = await fetchUserLogin(userInput)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      error && setError('')
      setAuthData(response.data)
    }
  }

  // Register user
  async function registerUser(userInput) {
    const inputErr = getInputErrors(userInput)
    if (inputErr) {
      setError(inputErr)
      return
    }

    const response = await fetchUserRegister(userInput)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      loginUser(userInput)
    }
  }

  // Logout user
  function logoutUser() {
    localStorage.removeItem('auth-token')
    setAuthData({})
  }

  // Delete user
  async function deleteUserAccount() {
    const deleteResponse = await fetchUserAccountDelete(authData.token)
    if (deleteResponse.status === 200) {
      localStorage.clear()
      logoutUser()
    }
  }

  // Request password reset link
  async function getResetLink(userInput) {
    const inputErr = getInputErrors(userInput)
    if (inputErr) {
      setError(inputErr)
      return
    }

    const response = await fetchPasswordReset(userInput.email)
    if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      return true
    }
  }

  // Save new password
  async function saveNewPassword(resetToken, userInput) {
    const inputErr = getInputErrors(userInput)
    if (inputErr) {
      setError(inputErr)
      return
    }

    const response = await fetchPasswordRenew(
      resetToken,
      userInput.password,
      userInput.passwordCheck
    )
    if (response.status === 200) {
      loginUser({ email: response.data.email, password: userInput.password })
    }
  }

  return {
    authData,
    registerUser,
    loginUser,
    logoutUser,
    deleteUserAccount,
    getResetLink,
    saveNewPassword,
  }
}
