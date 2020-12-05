import React from 'react'
import CollectionItem from '../collection-item/collection-item.component'
import { Link, useLocation } from 'react-router-dom'

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles'

export default function CollectionPreview({ title, items }) {
  const { pathname } = useLocation()

  return (
    <CollectionPreviewContainer>
      <TitleContainer to={`${pathname}/${title.toLowerCase()}`}>
        <h1>
          {title.toUpperCase()} <span className='link'>- view all</span>
        </h1>
      </TitleContainer>
      <PreviewContainer>
        {items
          .filter((item, i) => i < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  )
}
