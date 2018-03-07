import * as firebase from 'firebase';
import firebaseInit from './init';

firebaseInit();

export const ready = new Promise((resolve) => {
  firebase.auth().onAuthStateChanged(() => resolve());
});

export const getCurrentUser = () => firebase.auth().currentUser;

export const doCreateUserWithEmailAndPassword = (email, password) => ready.then(() => firebase.auth().createUserWithEmailAndPassword(email, password));

export const doSignInWithEmailAndPassword = (email, password) => ready.then(() => firebase.auth().signInWithEmailAndPassword(email, password));

export const doSignOut = () => firebase.auth().signOut();

export default {
  ready,
  getCurrentUser,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
};
