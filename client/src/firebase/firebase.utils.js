import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

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

export const storageRef = firebase.storage().ref()

/**
 * Check if there is a current user session and then return it
 * in the resolve. This function needs to be a Promise so that the
 * saga can yield on it.
 * @returns {promise} userAuth | null
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase

/**
 *
 * This function takes in a user auth object and checks
 * to see if it is in the database. If it is not in the database
 * then the user is stored.
 *
 * @param {object} userAuth
 * @param {object} additionalData
 * @returns {collectionReference}
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
        role: 'user',
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
 * If the collection does not already exist, create it
 * else append it to the items array in the existing collection
 * with a title of <collectionName>
 *
 * @param {string} collectionName
 * @param {object} item
 * @returns {promise} resolves to the item that was just added
 */
export const addItemToCollection = (collectionName, item) => {
  const itemWithId = {
    ...item,
    id: firestore.collection('collections').doc().id
  }

  const collectionNameLowerCased = collectionName.toLowerCase()

  return firestore
    .collection('collections')
    .where('title', '==', collectionNameLowerCased)
    .get()
    .then(async (snapShot) => {
      // If the collection already exists append the item into the items array
      const updateCollectionsPromises = []
      if (snapShot.size > 0) {
        updateCollectionsPromises.push(
          snapShot.forEach((product) => {
            firestore
              .collection('collections')
              .doc(product.id)
              .update({
                items: firebase.firestore.FieldValue.arrayUnion(itemWithId)
              })
          })
        )

        return Promise.all(updateCollectionsPromises).then(() => itemWithId)
      } else {
        // If the collection does not exists then create it here
        return firestore
          .collection('collections')
          .add({
            title: collectionNameLowerCased,
            items: [itemWithId]
          })
          .then(() => {
            return itemWithId
          })
          .catch((error) => error)
        // return `Collection created for ${collectionName} and product was added.`
      }
    })
    .catch((error) => error)
}

/**
 * Normalizes data from firebase database
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

/**
 *
 * @param {File} imageFile
 * @param {String} name
 * @returns {promise} url | errorMessage
 *
 */
export function firebaseImageUpload(imageFile) {
  const uploadPromise = new Promise((resolve, reject) => {
    if (!imageFile) {
      resolve(null)
    }

    const imageName = new Date() + '-' + imageFile.name
    const metaData = { contentType: imageFile.type }

    storageRef
      .child(imageName)
      .put(imageFile, metaData)
      .then((snapShot) => snapShot.ref.getDownloadURL())
      .then((url) => resolve(url))
      .catch((error) => reject(error.message))
  })

  return uploadPromise
}
