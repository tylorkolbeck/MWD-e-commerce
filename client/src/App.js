import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import CheckoutPage from './pages/checkout/checkout.component'
import AdminDashboard from './pages/admin/admin-dashboard.component'
import ProtectedRoute from './components/protected-route/protected-route.component'

import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions'
import { useDispatch } from 'react-redux'

import { GlobalStyle } from './global.styles'

function App() {
  const currentUser = useSelector(selectCurrentUser)

  // *** KEEP THIS FUNCTION FOR BULK INSERTING COLLECTIONS ***
  // *** INTO THE DATABASE ***
  // useEffect(() => {
  //   addCollectionAndDocuments(
  //     'collections',
  //     collections.map(({ title, items }) => ({ title, items }))
  //   )
  // }, [])
  // *** END BULK INSERT FUNCTION ***
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() => {
            return currentUser ? <Redirect to='/' /> : <SignInSignUp />
          }}
        />
        <ProtectedRoute
          exact
          path='/admin'
          component={AdminDashboard}
          hasAccess={currentUser?.role === 'admin' ? true : false}
        />
      </Switch>
    </div>
  )
}

export default App
