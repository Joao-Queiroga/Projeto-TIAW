import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACJ-fSd4NfQzmLJ9q0rMeumnADKPfApto",
  authDomain: "tiaw-ee36d.firebaseapp.com",
  databaseURL: "https://tiaw-ee36d-default-rtdb.firebaseio.com",
  projectId: "tiaw-ee36d",
  storageBucket: "tiaw-ee36d.appspot.com",
  messagingSenderId: "411404755967",
  appId: "1:411404755967:web:9bbb6cc147f55cd8233dca"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const db = firebase.firestore();

export {firebase, auth, database, db};
