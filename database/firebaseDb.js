
import * as firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBV4GX24H9Ko5Gyh1UNY6HVvZVGH3UNnQA",
  authDomain: "birdproject-33717.firebaseapp.com",
  projectId: "birdproject-33717",
  storageBucket: "birdproject-33717.appspot.com",
  messagingSenderId: "339629825107",
  appId: "1:339629825107:web:5d371e94a12af39199baa6",
  measurementId: "G-XKWVQGF64Y",

};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;