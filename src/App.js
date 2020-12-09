import React, { useEffect } from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions'
import { useDispatch } from 'react-redux'

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
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/collections' component={ShopPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/signin'
          render={() => {
            return currentUser ? <Redirect to='/' /> : <SignInSignUp />
          }}
        />
      </Switch>
    </div>
  )
}

export default App
