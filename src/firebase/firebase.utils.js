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

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
