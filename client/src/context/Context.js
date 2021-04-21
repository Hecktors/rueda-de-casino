import { createContext } from 'react'
import useAppState from '../hooks/useAppState'
import useUser from '../hooks/useUser'
import useLevels from '../hooks/useLevels'
import useAudios from '../hooks/useAudios'
import useError from '../hooks/useError'
const Context = createContext()

function ContextProvider({ children }) {
  const { userData, setUserData } = useUser()
  const { levels, refreshLevels } = useLevels(userData)
  const { appState, setAppState } = useAppState(levels)
  const { audios } = useAudios(userData, levels)
  const { error, setError } = useError()

  const isLogedIn = !!userData.user

  return (
    <Context.Provider
      value={{
        isLogedIn,
        userData,
        levels,
        appState,
        audios,
        error,
        setUserData,
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
