import { useState, useEffect } from 'react'
import getInputErrors from '../lib/checkInputs'
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from '../lib/localStorage'
import {
  fetchUserLogin,
  fetchUserRegister,
  fetchTokenVerification,
  fetchUserAccountDelete,
  fetchPasswordReset,
  fetchPasswordRenew,
} from '../services/userAPIs'

export default function useAuth(setError) {
  const [authToken, setAuthToken] = useState(null)

  useEffect(() => {
    async function initfetch() {
      const storedToken = getLocalStorage('authToken')

      if (storedToken) {
        const tokenRes = await fetchTokenVerification(storedToken)
        !tokenRes?.err
          ? setAuthToken(storedToken)
          : setLocalStorage('authToken', null)
      }
    }
    initfetch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Login user
  async function loginUser(userInput) {
    const inputError = getInputErrors(userInput)

    if (inputError) {
      setError(inputError)
      return
    }

    const response = await fetchUserLogin(userInput)

    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      // Login successful
      if ('caches' in window) {
        console.log('Write cache')
        caches.open('video').then((cache) => {
          cache.add(`${process.env.REACT_APP_BASE}/assets/video/rueda.mp4`)
        })
        caches.open('song').then((cache) => {
          cache.add(
            `${process.env.REACT_APP_BASE}/assets/audio/Uno_dos_tres.mp3`
          )
        })
      }
      setLocalStorage('authToken', response.data.token)
      setLocalStorage('userName', response.data.user)
      setAuthToken(response.data.token)
    }
  }

  // Register user
  async function registerUser(userInput) {
    const inputError = getInputErrors(userInput)

    if (inputError) {
      setError(inputError)
      return
    }

    const response = await fetchUserRegister(userInput)

    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      // Register successful - login new user
      loginUser({ email: response.data.email, password: userInput.password })
    }
  }

  // Logout user
  function logoutUser() {
    clearLocalStorage()
    setAuthToken(null)
  }

  // Request password reset link
  async function getResetLink(userInput) {
    const inputError = getInputErrors(userInput)

    if (inputError) {
      setError(inputError)
      return
    }
    const response = await fetchPasswordReset(userInput.email)

    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      // Request successful - reset link is sent
      return true
    }
  }

  // Save new password
  async function saveNewPassword(resetToken, userInput) {
    const inputError = getInputErrors(userInput)

    if (inputError) {
      setError(inputError)
      return
    }

    const response = await fetchPasswordRenew(
      resetToken,
      userInput.password,
      userInput.passwordCheck
    )

    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      // Update password successfully
      loginUser({ email: response.data.email, password: userInput.password })
    }
  }

  // Delete user
  async function deleteUserAccount() {
    const response = await fetchUserAccountDelete(authToken)

    if (!response) {
      setError('No internet connection')
    } else if (response.status !== 200) {
      setError(response.data.msg)
    } else {
      // Delete user account successfully
      logoutUser()
    }
  }

  return {
    authToken,
    registerUser,
    loginUser,
    logoutUser,
    deleteUserAccount,
    getResetLink,
    saveNewPassword,
  }
}
