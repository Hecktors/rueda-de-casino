import React, { useContext } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'
import { Context } from './context/Context'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMsg from './components/ErrorMsg'

const Register = React.lazy(() => import('./pages/Register'))
const Login = React.lazy(() => import('./pages/Login'))
const Home = React.lazy(() => import('./pages/Home'))
const Session = React.lazy(() => import('./pages/Session'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Edit = React.lazy(() => import('./pages/Edit'))
const Account = React.lazy(() => import('./pages/Account/Account'))

export default function App() {
  const { isLogedin, error, setError } = useContext(Context)
  const classes = !!useRouteMatch('/session')?.isExact ? ' session' : ''

  return (
    <div className={`App${classes}`}>
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}

      <React.Suspense fallback={<LoadingSpinner />}>
        <Switch>
          {!isLogedin ? (
            <>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Redirect to="/login" />
            </>
          ) : (
            <>
              <Route exact path="/" component={Home} />
              <Route path="/session" component={Session} />
              <Route path="/settings" component={Settings} />
              <Route path="/edit" component={Edit} />
              <Route path="/account" component={Account} />
              <Redirect to="/" />
            </>
          )}
        </Switch>
      </React.Suspense>
    </div>
  )
}
