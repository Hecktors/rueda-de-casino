import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import useUser from './hooks/useUser'
import AppContext from './context/AppContext'
import useAppState from './hooks/useAppState'
import useLevels from './hooks/useLevels'
import useAudios from './hooks/useAudios'
import ErrorMsg from './components/ErrorMsg'
import React from 'react'

import LoadingSpinner from './components/LoadingSpinner'
const AuthOptions = React.lazy(() => import('../auth/AuthOptions'))
const Register = React.lazy(() => import('../auth/Register'))
const Login = React.lazy(() => import('../auth/Login'))
const Home = React.lazy(() => import('../home'))
const Session = React.lazy(() => import('../session'))
const Settings = React.lazy(() => import('../settings'))
const Edit = React.lazy(() => import('../edit'))
const Account = React.lazy(() => import('../auth/Account'))

export default function App() {
  const { userData, setUserData } = useUser()
  const { levels, refreshLevels } = useLevels(userData)
  const { appState, setAppState, error, setError } = useAppState(levels)
  const audios = useAudios(userData, levels)

  const location = useLocation()
  const isLogedin = !!userData.user
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
        <React.Suspense fallback={<LoadingSpinner />}>
          <Switch>
            {!isLogedin ? (
              <>
                <Route exact path="/" component={AuthOptions} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
              </>
            ) : (
              <>
                <Route exact path="/" component={Home} />
                <Route path="/session" component={Session} />
                <Route path="/settings" component={Settings} />
                <Route path="/account" component={Account} />
                <Route path="/edit" component={Edit} />
              </>
            )}
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </AppContext.Provider>
    </div>
  )
}
