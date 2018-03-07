import * as firebase from 'firebase';

import firebaseConfig from './config';

export default function firebaseInit() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}
