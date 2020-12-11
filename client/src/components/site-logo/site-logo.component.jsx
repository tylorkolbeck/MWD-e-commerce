import React from 'react'
import { LogoContainer, SiteTitleContainer } from './site-logo.styles'
import { ReactComponent as Logo } from '../../assets/crown.svg'

function HeaderLogo({ siteName }) {
  return (
    <LogoContainer to='/'>
      <div>
        <Logo />
      </div>
      <SiteTitleContainer>
        <h1>{siteName}</h1>
      </SiteTitleContainer>
    </LogoContainer>
  )
}

export default HeaderLogo
