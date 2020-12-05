import { Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from './services/localStorage'
import levels from './data/pensum.json'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Session from './pages/Session'

const STORAGE_KEY = 'settings'

export default function App() {
  const [settings, setSettings] = useState({
    moveIDs: [],
    speed: 2900,
    isSongActive: false,
  })
  const [isFirstAppStart, setIsFirstAppStart] = useState(true)

  const moves = settings.moveIDs
    ? levels
        .map((level) => level.moves)
        .flat(1)
        .filter((move) => settings.moveIDs.includes(move.id))
    : []

  useEffect(() => {
    const StoredData = getLocalStorage(STORAGE_KEY)
    setSettings(
      StoredData ?? {
        moveIDs: [],
        isSongActive: false,
        speed: 3000,
      }
    )
    setIsFirstAppStart(!StoredData)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function updateSettings(userInput) {
    isFirstAppStart && setIsFirstAppStart(false)
    setSettings(userInput)
    setLocalStorage(STORAGE_KEY, userInput)
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
            isSongActive={settings.isSongActive}
          />
        )}
      />
    </Switch>
  )
}
