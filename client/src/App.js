import React, { useContext } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { Context } from './context/Context'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMsg from './components/ErrorMsg'
import logo from './assets/svg/dancing.svg'

import Login from './pages/Login'
import Register from './pages/Register'
import PasswordReset from './pages/PasswordReset'
import PasswordRenew from './pages/PasswordRenew'

const Home = React.lazy(() => import('./pages/Home'))
const Session = React.lazy(() => import('./pages/Session'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Edit = React.lazy(() => import('./pages/Edit'))
const Account = React.lazy(() => import('./pages/Account'))

export default function App() {
  const { isLoggedIn, error, setError } = useContext(Context)
  const classes = !!useRouteMatch('/session')?.isExact ? ' session' : ''

  const routes = !isLoggedIn ? (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/password-reset" component={PasswordReset} />
      <Route path="/password-renew/:resetToken" component={PasswordRenew} />
      <Redirect to="/login" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/session" component={Session} />
      <Route path="/settings" component={Settings} />
      <Route path="/edit" component={Edit} />
      <Route path="/account" component={Account} />
      <Redirect to="/" />
    </Switch>
  )

  return (
    <div
      className={`App${classes}`}
      style={{ backgroundImage: `url(${logo})` }}
    >
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}
      <React.Suspense fallback={<LoadingSpinner />}>{routes}</React.Suspense>
    </div>
  )
}
