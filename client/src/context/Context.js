import { createContext } from 'react'
import useAppState from '../hooks/useAppState'
import useAuth from '../hooks/useAuth'
import useLevels from '../hooks/useLevels'
import useAudios from '../hooks/useAudios'
import useError from '../hooks/useError'
const Context = createContext()

function ContextProvider({ children }) {
  const { error, setError } = useError()
  const {
    authData,
    registerUser,
    loginUser,
    logoutUser,
    deleteUserAccount,
  } = useAuth(error, setError)
  const { levels, refreshLevels } = useLevels(authData)
  const { audios } = useAudios(authData, levels)
  const { appState, setAppState } = useAppState(levels)

  const isLogedIn = !!authData.user
  console.log(authData)
  return (
    <Context.Provider
      value={{
        authData,
        isLogedIn,
        levels,
        appState,
        audios,
        error,
        logoutUser,
        registerUser,
        loginUser,
        deleteUserAccount,
        refreshLevels,
        setAppState,
        setError,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
