import React from 'react'
import './collections-overview.styles.scss'
import { useSelector } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import CollectionPreview from '../collection-preview/collection-preview.component'

export default function CollectionsOverview() {
  const collections = useSelector(selectCollectionsForPreview)

  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...collectionProps }) => (
        <CollectionPreview key={id} {...collectionProps} />
      ))}
    </div>
  )
}
