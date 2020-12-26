import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import useUser from './hooks/useUser'
import AppContext from '../context/AppContext'
import useAppState from './hooks/useAppState'
import useData from './hooks/useData'
import AuthOptions from '../auth/AuthOptions'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Home from '../home'
import Session from '../session'
import EditForm from '../edit/EditForm'
import EditOverview from '../edit/EditOverview'
import UserSettings from '../auth/UserSettings'

export default function App() {
  const [userData, setUserData] = useUser()
  console.log(userData)
  const [pensum, addMove, updateMove, deleteMove, audios] = useData()
  const [appState, selectedMoves, updateAppState, resetAppState] = useAppState(
    pensum
  )
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
      <AppContext.Provider value={{ userData, setUserData }}>
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
            render={(props) => (
              <EditOverview
                {...props}
                pensum={pensum}
                addMove={addMove}
                updateMove={updateMove}
                deleteMove={deleteMove}
              />
            )}
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
      </AppContext.Provider>
    </div>
  )
}
