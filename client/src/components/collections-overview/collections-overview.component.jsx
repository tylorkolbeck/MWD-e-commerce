import React from 'react'
import { useSelector } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/collection-preview.component'
import LayoutContainer from '../../layouts/layout-container.component'

import {
  CollectionsOverviewContainer,
  TitleContainer
} from './collections-overview.styles'

export default function CollectionsOverview() {
  const collections = useSelector(selectCollectionsForPreview)

  return (
    <LayoutContainer>
      <CollectionsOverviewContainer>
        <TitleContainer>Collections</TitleContainer>
        {collections.map(({ id, ...collectionProps }) => (
          <CollectionPreview key={id} {...collectionProps} />
        ))}
      </CollectionsOverviewContainer>
    </LayoutContainer>
  )
}
