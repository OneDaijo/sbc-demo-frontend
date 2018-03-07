import Promise from 'bluebird';
import apiClient from './helpers/apiClient';
import { firebaseAuth } from '../firebaseHelpers';

const DISPLAY_NAME_SEPARATOR = ':';

export function loadUser() {
  return {
    type: 'USER_LOAD',
    payload: firebaseAuth.ready
    .then(() => {
      const firebaseUser = firebaseAuth.getCurrentUser();
      return firebaseUser && firebaseUser.reload();
    })
    .then(() => apiClient.get('/user')),
  };
}


export function login({ email, password }) {
  const currentUser = firebaseAuth.getCurrentUser();
  return {
    type: 'USER_LOGIN',
    payload: Promise.try(() => (currentUser === null ? firebaseAuth.doSignInWithEmailAndPassword(email, password) : Promise.resolve(currentUser)))
    .then(() => apiClient.get('/user'))
  };
}


export function logout() {
  const firebaseUser = firebaseAuth.getCurrentUser();

  return {
    type: 'USER_LOGOUT',
    payload: firebaseUser !== null ? firebaseAuth.doSignOut() : Promise.resolve(null),
  };
}


export function signup(userInfo) {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
  } = userInfo;

  return {
    type: 'USER_SIGNUP',
    payload: firebaseAuth.ready.then(() => firebaseAuth.doCreateUserWithEmailAndPassword(email, password))
    .then((firebaseUser) => {
      const {
        uid,
      } = firebaseUser;

      const newUser = {
        uid,
        email,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
      };

      const displayName = `${firstName.trim()}${DISPLAY_NAME_SEPARATOR}${lastName.trim()}`;
      return firebaseUser.sendEmailVerification()
      .then(() => firebaseUser.updateProfile({ displayName }))
      .then(() => apiClient.post('/user', { data: newUser }));
    }),
  };
}

export function updateUser(patchInfo) {
  return {
    type: 'USER_UPDATE',
    payload: apiClient.patch('/user', { data: patchInfo }),
  };
}

export default {
  loadUser,
  login,
  logout,
  signup,
  updateUser,
};
