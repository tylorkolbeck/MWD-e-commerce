import React from 'react'
import './collection-preview.styles.scss'

import CollectionItem from '../collection-item/collection-item.component'

export default function CollectionPreview({ title, items }) {
  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <div className='preview'>
        {items
          .filter((item, i) => i < 4)
          .map(({ id, ...collectionItemProps }) => (
            <CollectionItem key={id} {...collectionItemProps} />
          ))}
      </div>
    </div>
  )
}
