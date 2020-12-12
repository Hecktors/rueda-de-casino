import { Route, Switch, useLocation } from 'react-router-dom'
// import { useState } from 'react'
// import pensum from './data/pensum.json'
import useAppState from './useAppState'
import usePensum from './usePensum'
import Home from '../home/Home'
import Session from '../session/Session'
import Update from '../update/Update'

export default function App(props) {
  const [pensum, setPensum] = usePensum()
  
  const [appState, selectedMoves, updateAppState, resetAppState] = useAppState(
    pensum
    )
    console.log("pensum:", pensum)
    console.log("selectedMoveIDS:" , appState.selectedMoveIDs)
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
              levels={pensum}
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
          path="/update"
          render={(props) => (
            <Update {...props} levels={pensum} updateLevels={setPensum} />
          )}
        />
      </Switch>
    </div>
  )
}
