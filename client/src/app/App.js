import { Route, Switch, useLocation } from 'react-router-dom'
import useAppState from './useAppState'
import useData from './useData'
import Home from '../home/Home'
import Session from '../session/Session'
import EditOverview from '../editOverview/EditOverview'
import EditForm from '../editForm/EditForm'

export default function App() {
  const [pensum, addMove, updateMove, deleteMove, audios] = useData()
  const [appState, selectedMoves, updateAppState, resetAppState] = useAppState(
    pensum
  )
  const location = useLocation()
  const classes = location.pathname === '/session' ? 'dark' : ''
  console.log(audios)
  return (
    <div className={`App ${classes}`}>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              {...props}
              audios={audios}
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
      </Switch>
    </div>
  )
}
