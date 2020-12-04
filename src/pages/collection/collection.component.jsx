import React from 'react'
import './collection.styles.scss'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selectors'
import { useSelector } from 'react-redux'

function CollectionPage({ match }) {
  const collection = useSelector(selectCollection(match.params.collectionId))
  const { title, items } = collection

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map((collectionItem) => (
          <CollectionItem key={collectionItem.id} item={collectionItem} />
        ))}
      </div>
    </div>
  )
}

export default CollectionPage
