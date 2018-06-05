import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCZpAQyExCuENk_2RFAVZ2BLwXCiqj7bMQ",
  authDomain: "react-drawer.firebaseapp.com",
  databaseURL: "https://react-drawer.firebaseio.com",
  projectId: "react-drawer",
  storageBucket: "react-drawer.appspot.com",
  messagingSenderId: "796755797467"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}
