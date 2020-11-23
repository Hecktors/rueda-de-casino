import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Session from './pages/Session'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact strict path="/settings" component={Settings} />
      <Route exact path="/session" component={Session} />
    </Switch>
  )
}
