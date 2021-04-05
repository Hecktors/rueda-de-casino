import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import useUser from './hooks/useUser'
import AppContext from './context/AppContext'
import useAppState from './hooks/useAppState'
import useLevels from './hooks/useLevels'
import useAudios from './hooks/useAudios'
import ErrorMsg from './components/ErrorMsg'
import AuthOptions from '../auth/AuthOptions'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../home'
import Session from '../session'
import Settings from '../settings'
import Edit from '../edit'
import UserSettings from '../auth/UserSettings'

export default function App() {
  const { userData, setUserData } = useUser()
  const { levels, refreshLevels } = useLevels(userData)
  const { appState, setAppState, error, setError } = useAppState(levels)

  const audios = useAudios(userData, levels)
  const isLogedin = !!userData.user
  const location = useLocation()
  const classes = location.pathname === '/session' ? ' session' : ''

  return (
    <div className={`App${classes}`}>
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}
      <AppContext.Provider
        value={{
          userData,
          levels,
          appState,
          audios,
          setUserData,
          refreshLevels,
          setAppState,
          setError,
        }}
      >
        <Switch>
          {!isLogedin ? (
            <Route exact path="/" component={AuthOptions} />
          ) : (
            <Route exact path="/" component={Home} />
          )}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          isLogedin && <Route path="/session" component={Session} />
          isLogedin && <Route path="/settings" component={Settings} />
          isLogedin && <Route path="/user-settings" component={UserSettings} />
          isLogedin && <Route path="/edit" component={Edit} />
          <Redirect to="/" />
        </Switch>
      </AppContext.Provider>
    </div>
  )
}
