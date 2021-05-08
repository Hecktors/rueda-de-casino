import { useState, createContext } from 'react'
import useAppState from '../hooks/useAppState'
import useAuth from '../hooks/useAuth'
import useLevels from '../hooks/useLevels'
import useAudios from '../hooks/useAudios'
import useError from '../hooks/useError'
const Context = createContext()

function ContextProvider({ children }) {
  const { error, setError } = useError()
  const {
    authToken,
    registerUser,
    loginUser,
    logoutUser,
    deleteUserAccount,
    getResetLink,
    saveNewPassword,
  } = useAuth(setError)
  const { levels, refreshLevels } = useLevels(authToken)
  const { audios } = useAudios(authToken, levels)
  const { appState, setAppState } = useAppState(levels)
  const [deferredPrompt, setDeferredPrompt] = useState()

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault()
    setDeferredPrompt(event)
    return false
  })

  const isLoggedIn = !!authToken
  return (
    <Context.Provider
      value={{
        authToken,
        isLoggedIn,
        levels,
        appState,
        audios,
        deferredPrompt,
        error,
        logoutUser,
        registerUser,
        loginUser,
        deleteUserAccount,
        getResetLink,
        saveNewPassword,
        refreshLevels,
        setAppState,
        setDeferredPrompt,
        setError,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
