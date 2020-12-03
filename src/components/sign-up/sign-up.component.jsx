import React, { useState } from 'react'
import './sign-up.styles.scss'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
  auth,
  createUserProfileDocument,
  signInWithGoogle
} from '../../firebase/firebase.utils'

function SignUp() {
  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    formError: ''
  })

  async function handleSubmit(event) {
    event.preventDefault()
    const { displayName, email, password, confirmPassword } = state

    if (password !== confirmPassword) {
      setState({ ...state, formError: 'Passwords do not match' })
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await createUserProfileDocument(user, { displayName })
      setState((prevState) => ({
        ...prevState,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }))
    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const { displayName, email, password, confirmPassword } = state

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confrim Password'
          required
        />
        {state.formError && <p>{state.formError}</p>}
        <div className='button-group'>
          <Button type='submit'>SIGN UP</Button>
          <Button type='button' onClick={signInWithGoogle} isGoogleSignIn>
            SIGN UP WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
