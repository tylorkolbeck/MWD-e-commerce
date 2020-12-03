import React from 'react'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'
import { SHOP_DATA } from '../../utils/dummyData'

export default function Shop() {
  return (
    <div className='shop-page'>
      {SHOP_DATA.map(({ id, ...collectionProps }) => (
        <CollectionPreview key={id} {...collectionProps} />
      ))}
    </div>
  )
}
