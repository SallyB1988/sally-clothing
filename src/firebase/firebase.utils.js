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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); // triggers google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;