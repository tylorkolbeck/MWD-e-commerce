import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAzohRv5WFfgtKqd0c_Pi6tWfypkM9vuek',
  authDomain: 'e-commerce-6eb74.firebaseapp.com',
  projectId: 'e-commerce-6eb74',
  storageBucket: 'e-commerce-6eb74.appspot.com',
  messagingSenderId: '320595468963',
  appId: '1:320595468963:web:f6469836f72dbabf3ed516'
}

firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()

export const auth = firebase.auth()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

/**
 *
 * This function takes in a user auth object and checks
 * to see if it is in the database. If it is not in the database
 * then the user is stored.
 *
 * @param {object} userAuth
 * @param {object} additionalData
 * @returns {firebase.snapshot}
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef
}

/**
 * This function creates a new collection in firebase
 * with a new document for every item in objectsToAddArray.
 *
 * The function batchs the calls to ensure that all document
 * inserts are successful.
 *
 * @param {string} collectionKey
 * @param {array} objectsToAddArray
 * @returns {promise}
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAddArray
) => {
  const collectionRef = firestore.collection(collectionKey)

  const batch = firestore.batch()

  objectsToAddArray.forEach((obj) => {
    // Create a new document element with a UID
    const newDocRef = collectionRef.doc()

    // Batch the calls to the DB
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

/**
 * Normalizes data from firebase database so
 * to a format that the front end can use
 * @param {array} collections
 * @returns {object}
 */
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()

    return {
      id: doc.id,
      title,
      items,
      routeName: encodeURI(title.toLowerCase())
    }
  })

  return transformedCollection.reduce((accumulator, collectionItem) => {
    accumulator[collectionItem.title.toLowerCase()] = collectionItem
    return accumulator
  }, {})
}
