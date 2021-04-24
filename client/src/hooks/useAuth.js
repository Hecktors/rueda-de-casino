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
      const storedAuthData = getLocalStorage('auth')
      if (!storedAuthData?.token) {
        return
      }

      const tokenRes = await fetchTokenVerification(storedAuthData.token)
      if (!tokenRes) {
        setAuthData({
          token: storedAuthData.token,
          user: storedAuthData.user,
        })
        return
      }
      if (tokenRes?.err) {
        setError(tokenRes.err)
        return
      }
      const userResponse = await fetchUser(storedAuthData.token)
      setAuthData({
        token: storedAuthData.token,
        user: userResponse,
      })
    }
    initfetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLocalStorage('auth', authData)
  }, [authData])

  // Login user
  async function loginUser(userInput) {
    const inputErr = getInputErrors(userInput)
    if (inputErr) {
      setError(inputErr)
      return
    }

    const response = await fetchUserLogin(userInput)
    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
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
    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
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
    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
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
