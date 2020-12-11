import React from 'react'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selectors'
import { useSelector } from 'react-redux'
import BreadCrumbs from '../../components/bread-crumb/bread-crumb.component'
import LayoutContainer from '../../layouts/layout-container.component'
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './collection.styles'

function CollectionPage({ match }) {
  const collection = useSelector(selectCollection(match.params.collectionId))
  const { title, items } = collection

  return (
    <LayoutContainer>
      <CollectionPageContainer>
        <BreadCrumbs pathsArray={['Shop', title]} />

        <CollectionTitle>{title}</CollectionTitle>
        <CollectionItemsContainer>
          {items.map((collectionItem) => (
            <CollectionItem key={collectionItem.id} item={collectionItem} />
          ))}
        </CollectionItemsContainer>
      </CollectionPageContainer>
    </LayoutContainer>
  )
}

export default CollectionPage
