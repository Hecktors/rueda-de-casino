import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import useUser from './hooks/useUser'
import AppContext from './context/AppContext'
import useAppState from './hooks/useAppState'
import usePensum from './hooks/usePensum'
import AuthOptions from '../auth/AuthOptions'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../home'
import Session from '../session'
import EditForm from '../edit/EditForm'
import EditOverview from '../edit/EditOverview'
import UserSettings from '../auth/UserSettings'
import ErrorMsg from './components/ErrorMsg'

export default function App() {
  const { userData, setUserData } = useUser()
  const { pensum, refreshPensum, audios } = usePensum(userData)
  const {
    appState,
    setAppState,
    selectedMoves,
    error,
    setError,
  } = useAppState()

  const location = useLocation()
  const classes = location.pathname === '/edit-overview' ? ' no-footer' : ''

  return (
    <div className={`App${classes}`}>
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}
      <div className="desktop-only">
        This application is optimized for mobile devices.
      </div>
      <AppContext.Provider
        value={{
          userData,
          setUserData,
          pensum,
          refreshPensum,
          appState,
          setAppState,
          setError,
        }}
      >
        <Switch>
          {!userData.user ? (
            <Route exact path="/" component={AuthOptions} />
          ) : (
            <Route exact path="/" render={(props) => <Home {...props} />} />
          )}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route
            exact
            path="/session"
            render={(props) => (
              <Session
                {...props}
                audios={audios}
                moves={selectedMoves}
                speed={appState.speed}
                isSongActive={appState.isSongActive}
              />
            )}
          />
          <Route path="/user-settings" component={UserSettings} />
          <Route
            exact
            path="/edit-overview"
            render={(props) => <EditOverview {...props} />}
          />
          <Route
            exact
            path="/edit-form/:id?"
            render={(props) => <EditForm {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      </AppContext.Provider>
    </div>
  )
}
