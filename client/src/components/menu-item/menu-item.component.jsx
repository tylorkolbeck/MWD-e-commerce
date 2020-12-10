import React from 'react'
// import './menu-item.styles.scss'
import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer
} from './menu-item.styles'
import { withRouter } from 'react-router-dom'

function MenuItem({ title, imageUrl, size, history, linkUrl, match }) {
  return (
    <MenuItemContainer onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <BackgroundImageContainer imageUrl={imageUrl} />
      <ContentContainer>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOW NOW</span>
      </ContentContainer>
    </MenuItemContainer>
  )
}

export default withRouter(MenuItem)
