import { Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from './lib/localStorage'
import pensum from './data/pensum.json'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Session from './pages/Session'

export default function App() {
  const [selectedMoves, setSelectedMoves] = useState([])

  useEffect(() => {
    setSelectedMoves(getLocalStorage('selectedMoves') ?? [])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateSelectedMoves(moveIds) {
    const updatedSelectedMoves = []
    pensum.forEach((level) =>
      level.moves.forEach(
        (move) => moveIds.includes(move.id) && updatedSelectedMoves.push(move)
      )
    )
    setSelectedMoves(updatedSelectedMoves)
    setLocalStorage('selectedMoves', updatedSelectedMoves)
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} selectedMoves={selectedMoves} />}
      />
      <Route
        exact
        path="/settings"
        render={(props) => (
          <Settings
            {...props}
            moves={pensum}
            selectedMoves={selectedMoves}
            setSelectedMoves={setLocalStorage}
            updateSelectedMoves={updateSelectedMoves}
          />
        )}
      />
      <Route
        exact
        path="/session"
        render={(props) => <Session {...props} selectedMoves={selectedMoves} />}
      />
    </Switch>
  )
}
