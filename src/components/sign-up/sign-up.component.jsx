import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { googleSignInStart, signUpStart } from '../../redux/user/user.actions'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
  SignUpContainer,
  SignUpTitle,
  ButtonsBarContainer
} from './sign-up.styles'

function SignUp() {
  const [state, setState] = useState({
    displayName: 'testUser',
    email: 'testemail',
    password: '123456',
    confirmPassword: '123456',
    formError: ''
  })

  const dispatch = useDispatch()

  async function handleSubmit(event) {
    event.preventDefault()

    const { displayName, email, password, confirmPassword } = state

    if (password !== confirmPassword) {
      setState({ ...state, formError: 'Passwords do not match' })
      return
    }

    dispatch(signUpStart({ displayName, email, password }))

    setState((prevState) => ({
      ...prevState,
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }))
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
    <SignUpContainer>
      <SignUpTitle>I do not have an account</SignUpTitle>
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
        <ButtonsBarContainer>
          <Button type='submit'>SIGN UP</Button>
          <Button
            type='button'
            onClick={() => dispatch(googleSignInStart())}
            isGoogleSignIn
          >
            SIGN UP WITH GOOGLE
          </Button>
        </ButtonsBarContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignUp
