import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import useUser from './hooks/useUser'
import UserContext from './context/UserContext'
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

export default function App() {
  const { userData, setUserData } = useUser()
  const { pensum, addMove, updateMove, deleteMove, audios } = usePensum()
  const {
    appState,
    selectedMoves,
    updateAppState,
    resetAppState,
  } = useAppState(pensum)
  const location = useLocation()
  const classes =
    location.pathname === '/edit-overview' || location.pathname === '/'
      ? ' no-footer'
      : ''

  return (
    <div className={`App${classes}`}>
      <div className="desktop-only">
        This application is optimized for mobile devices.
      </div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Switch>
          {userData.user ? (
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  pensum={pensum}
                  appState={appState}
                  updateAppState={updateAppState}
                  resetAppState={resetAppState}
                />
              )}
            />
          ) : (
            <Route exact path="/" component={AuthOptions} />
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
            render={(props) => <EditOverview {...props} pensum={pensum} />}
          />
          <Route
            exact
            path="/edit-form/:id?"
            render={(props) => (
              <EditForm
                {...props}
                pensum={pensum}
                addMove={addMove}
                updateMove={updateMove}
                deleteMove={deleteMove}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </UserContext.Provider>
    </div>
  )
}
