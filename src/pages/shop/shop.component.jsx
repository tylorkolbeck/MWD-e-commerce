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

    // ** Preferred way to fetch data from firebase
    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      dispatch(updateCollections(collectionsMap))
      setIsLoading(false)
    })

    // ** Observable style of fetching data from firebase(data stream) **
    // ** Keep for reference **
    // const unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapshot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //     dispatch(updateCollections(collectionsMap))
    //     setIsLoading(false)
    //   }
    // )

    // ** REST EXAMPLE OF FETCHING FROM FIREBASE DB **
    // Not recommended due to the deep nesting of the return data
    // fetch(
    //   'https://firestore.googleapis.com/v1/projects/e-commerce-6eb74/databases/(default)/documents/collections'
    // )
    //   .then((response) => response.json())
    //   .then((collections) => console.log(collections))

    return () => {
      // ** If using observable style of reading from firebase
      // unsubscribeFromSnapshot()
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
