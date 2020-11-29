import { Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from './lib/localStorage'
import levels from './data/pensum.json'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Session from './pages/Session'

export default function App() {
  const [settings, setSettings] = useState({
    moveIDs: [],
    speed: 3050,
    isMuted: false,
  })
  const [isFirstAppStart, setIsFirstAppStart] = useState(true)

  const moves = settings.moveIDs
    ? levels
        .map((level) => level.moves)
        .flat(1)
        .filter((move) => settings.moveIDs.includes(move.id))
    : []

  useEffect(() => {
    setSettings(
      getLocalStorage('settings') ?? { moveIDs: [], isMuted: false, speed: 3 }
    )
    setIsFirstAppStart(!settings.moveIDs)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateSettings(userInput) {
    isFirstAppStart && setIsFirstAppStart(false)
    setSettings(userInput)
    setLocalStorage('settings', userInput)
  }
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <Home
            {...props}
            moves={moves}
            speed={settings.speed}
            isFirstAppStart={isFirstAppStart}
            setIsFirstAppStart={setIsFirstAppStart}
          />
        )}
      />
      <Route
        exact
        path="/settings"
        render={(props) => (
          <Settings
            {...props}
            levels={levels}
            settings={settings}
            updateSettings={updateSettings}
          />
        )}
      />
      <Route
        exact
        path="/session"
        render={(props) => (
          <Session
            {...props}
            moves={moves}
            speed={settings.speed}
            isMuted={settings.isMuted}
          />
        )}
      />
    </Switch>
  )
}
