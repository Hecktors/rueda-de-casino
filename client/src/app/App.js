import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import useAppState from './useAppState'
import useData from './useData'
import Home from '../home'
import Session from '../session'
import EditForm from '../edit/EditForm'
import EditOverview from '../edit/EditOverview'

export default function App() {
  const [pensum, addMove, updateMove, deleteMove, audios] = useData()
  const [appState, selectedMoves, updateAppState, resetAppState] = useAppState(
    pensum
  )
  const location = useLocation()
  const classes = location.pathname === '/edit-overview' ? ' no-footer' : ''

  return (
    <div className={`App${classes}`}>
      <div className="desktop-only">
        This application is optimized for mobile devices.
      </div>
      <Switch>
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
    </div>
  )
}
