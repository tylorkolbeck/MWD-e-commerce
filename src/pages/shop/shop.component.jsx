import React, { useState } from 'react'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'
import { SHOP_DATA } from '../../utils/dummyData'

export default function Shop() {
  const [state, setState] = useState({
    collections: SHOP_DATA
  })

  const { collections } = state

  return (
    <div className='shop-page'>
      {collections.map(({ id, ...collectionProps }) => (
        <CollectionPreview key={id} {...collectionProps} />
      ))}
    </div>
  )
}
