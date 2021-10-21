import React, { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Header from './components/Header'
import Progress from './components/Progress'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const MarketingApp = lazy(() => import('./components/MarketingApp'))
const AuthApp = lazy(() => import('./components/AuthApp'))
const DashboardApp = lazy(() => import('./components/DashboardApp'))

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleSignIn = () => {
    setIsSignedIn(true)
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header signedIn={isSignedIn} onSignOut={handleSignOut} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path='/auth'>
                <AuthApp onSignIn={handleSignIn} />
              </Route>
              <Route path='/dashboard' component={DashboardApp} />
              <Route path='/' component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
}

export default App