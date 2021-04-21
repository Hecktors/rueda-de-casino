import React, { useContext } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { Context } from './context/Context'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMsg from './components/ErrorMsg'

const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const PasswordReset = React.lazy(() => import('./pages/PasswordReset'))
const Home = React.lazy(() => import('./pages/Home'))
const Session = React.lazy(() => import('./pages/Session'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Edit = React.lazy(() => import('./pages/Edit'))
const Account = React.lazy(() => import('./pages/Account/Account'))

export default function App() {
  const { isLogedIn, error, setError } = useContext(Context)
  const classes = !!useRouteMatch('/session')?.isExact ? ' session' : ''

  const routes = !isLogedIn ? (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/password-reset" component={PasswordReset} />
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

  console.log(isLogedIn)
  return (
    <div className={`App${classes}`}>
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}
      <React.Suspense fallback={<LoadingSpinner />}>{routes}</React.Suspense>
    </div>
  )
}
