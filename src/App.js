import React, { useEffect } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

function App() {
  const dispatch = useDispatch()

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
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInSignUp} />
      </Switch>
    </div>
  )
}

export default App
