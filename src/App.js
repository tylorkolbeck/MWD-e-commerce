import React, { useEffect } from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import CheckoutPage from './pages/checkout/checkout.component'

import Header from './components/header/header.component'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector'

function App() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  // *** KEEP THIS FUNCTION FOR BULK INSERTING COLLECTIONS ***
  // *** INTO THE DATABASE ***
  // useEffect(() => {
  //   addCollectionAndDocuments(
  //     'collections',
  //     collections.map(({ title, items }) => ({ title, items }))
  //   )
  // }, [])
  // *** END BULK INSERT FUNCTION ***

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot((snapShot) => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          )
        })
      } else {
        dispatch(setCurrentUser(null))
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribeFromAuth()
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
