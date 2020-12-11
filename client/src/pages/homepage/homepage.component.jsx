import React from 'react'
import { HomePageContainer } from './homepage.styles'
import LayoutContainer from '../../layouts/layout-container.component'

import Directory from '../../components/directory/directory.component'

function Homepage() {
  return (
    <LayoutContainer>
      <HomePageContainer>
        <Directory />
      </HomePageContainer>
    </LayoutContainer>
  )
}

export default Homepage
