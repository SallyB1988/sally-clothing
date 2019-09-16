import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCucv6Es6xtUhzqEcVGvAG8uTlTZoDU_Fc",
  authDomain: "sally-clothing.firebaseapp.com",
  databaseURL: "https://sally-clothing.firebaseio.com",
  projectId: "sally-clothing",
  storageBucket: "",
  messagingSenderId: "100227075181",
  appId: "1:100227075181:web:88bda254bf04fcaca50364"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get();   // returns an array of the collection data objects in collectionSnapshot.docs
  // console.log(collectionSnapshot.docs.map(doc => doc.data()))

  // if data doesn't exist in snapShot, create a new data entry
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user ', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();  // gets the document at an empty string and generates an id for it
    batch.set(newDocRef, obj)
  });

  return await batch.commit()   // fires off the batch call, returns a promise

}

export const convertCollectionsSnapshotToMap = (collections) => {
  // transformedCollection adds routeName and id to the collections array
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      title: title,
      items: items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id
    }
  })

  // now take the transformedCollection and return the data as an object
  // rather than an array of objects.  ie, in the form:
  // hats: { collection data for hats },
  // jackets: { collection data for jackets },
  // ...
  // mens: { collection data for mens}

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  }, {})  // the empty object is the initial value
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // triggers google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;