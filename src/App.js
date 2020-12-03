import React, { useState, useEffect } from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'

import ShopPage from './pages/shop/shop.component'
import HomePage from './pages/homepage/homepage.component'
import Header from './components/header/header.component'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import firebase from './firebase/firebase.utils'

function App() {
  const [state, setState] = useState({
    currentUser: null
  })

  useEffect(() => {
    const unsubscribeFromAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setState((prevState) => ({ ...prevState, currentUser: user }))
      } else {
        setState((prevState) => ({ ...prevState, currentUser: null }))
      }
    })

    // Cleanup subscription on unmount
    return () => unsubscribeFromAuth()
  }, [])

  useEffect(() => {
    console.log(state.currentUser)
  }, [state])

  return (
    <div>
      <Header currentUser={state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInSignUp} />
      </Switch>
    </div>
  )
}

export default App
