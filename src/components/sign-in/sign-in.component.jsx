import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer
} from './sign-in.styles'

function SignIn() {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  async function handleSubmit(event) {
    event.preventDefault()
    const { email, password } = state
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    }
    setState({ ...state, email: '', password: '' })
  }

  function handleChange(event) {
    const { value, name } = event.target
    setState({ ...state, [name]: value })
  }

  return (
    <SignInContainer>
      <SignInTitle>Already have an account?</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={state.email}
          required
          handleChange={handleChange}
          label='Email'
        />
        <FormInput
          name='password'
          type='password'
          value={state.password}
          handleChange={handleChange}
          required
          label='Password'
        />
        <ButtonsBarContainer>
          <Button type='submit'>SIGN IN</Button>
          <Button onClick={signInWithGoogle} isGoogleSignIn type='button'>
            SIGN IN WITH GOOGLE
          </Button>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  )
}

export default SignIn
