import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { device } from './styles/device'
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
    <AppStyled
      className={`App${classes}`}
      style={{ backgroundImage: `url(${logo})` }}
    >
      {error && <ErrorMsg msg={error} clearError={() => setError('')} />}
      <React.Suspense fallback={<LoadingSpinner />}>{routes}</React.Suspense>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  background-position: center 75%;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: var(--color-bg);
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 900px;
  max-height: 800px;
  margin: auto;
  display: grid;
  grid-template-rows: 80px auto 80px;
  overflow-y: auto;

  @media ${device.tablet} {
    padding: 40px;
  }

  @media (orientation: landscape) {
    grid-template-rows: 80px auto 80px !important;
  }

  &.session {
    grid-template-rows: 100px auto 160px;
  }
`
