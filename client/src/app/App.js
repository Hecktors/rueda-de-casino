import { Route, Switch, useLocation } from 'react-router-dom'
import useAppState from './useAppState'
import usePensum from './usePensum'
import Home from '../home/Home'
import Session from '../session/Session'
import EditOverview from '../editOverview/EditOverview'
import EditForm from '../editForm/EditForm'

export default function App(props) {
  const [pensum, addMove, updateMove, deleteMove] = usePensum()

  const [appState, selectedMoves, updateAppState, resetAppState] = useAppState(
    pensum
  )

  const location = useLocation()
  const classes = location.pathname === '/session' ? 'dark' : ''

  return (
    <div className={`App ${classes}`}>
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
              appState={appState}
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
      </Switch>
    </div>
  )
}
