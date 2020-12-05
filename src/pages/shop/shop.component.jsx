import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import { useDispatch } from 'react-redux'
import { updateCollections } from '../../redux/shop/shop.actions'

import {
  convertCollectionsSnapshotToMap,
  firestore
} from '../../firebase/firebase.utils'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

function Shop({ match }) {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  // Fetch the collections from firestore
  useEffect(() => {
    const collectionRef = firestore.collection('collections')

    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch(updateCollections(collectionsMap))
        setIsLoading(false)
      }
    )

    return () => {
      unsubscribeFromSnapshot()
    }
  }, [dispatch])

  return (
    <div>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => (
          <CollectionPageWithSpinner isLoading={isLoading} {...props} />
        )}
      />
    </div>
  )
}

export default Shop
