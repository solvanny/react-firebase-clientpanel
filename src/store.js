import { createStore, combineReducers, compose  } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyCy2UbkWsoZEhToxUqzNElYlES2O0xojrE",
    authDomain: "react-client-panel-f0cf8.firebaseapp.com",
    databaseURL: "https://react-client-panel-f0cf8.firebaseio.com",
    projectId: "react-client-panel-f0cf8",
    storageBucket: "react-client-panel-f0cf8.appspot.com",
    messagingSenderId: "849765053872"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
// 
// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;