import React, { useState } from 'react'
import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

function SignIn() {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(event) {
    event.preventDeafult()
    setState({ ...state, email: '', password: '' })
  }

  function handleChange(event) {
    const { value, name } = event.target
    setState({ ...state, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>Already have an account?</h2>
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

        <Button type='submit'>SIGN IN</Button>
      </form>
    </div>
  )
}

export default SignIn
