import React, { useState, lazy, Suspense, useEffect } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { createBrowserHistory } from 'history'
import Header from './components/Header'
import Progress from './components/Progress'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const MarketingApp = lazy(() => import('./components/MarketingApp'))
const AuthApp = lazy(() => import('./components/AuthApp'))
const DashboardApp = lazy(() => import('./components/DashboardApp'))

const history = createBrowserHistory()

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleSignIn = () => {
    setIsSignedIn(true)
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  useEffect(() => {
    if(isSignedIn) {
      history.push('/dashboard')
    }
  }, [isSignedIn])

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header signedIn={isSignedIn} onSignOut={handleSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthApp onSignIn={handleSignIn} />
              </Route>
              <Route path='/dashboard'>
                {!isSignedIn ? <Redirect /> : <DashboardApp />}
              </Route>
              <Route path='/' component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  )
}

export default App