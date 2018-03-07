import Promise from 'bluebird';
import superagent from 'superagent';

import { firebaseAuth } from '../../firebaseHelpers';

// TODO: add this url
const API_URL = 'https://www.onedaijo.com';
const FORCE_TOKEN_REFRESH = true;
const AUTH_HEADER_NAME = 'X-firebase-token';

const exists = val => val !== undefined && val !== null;

export default ['get', 'post', 'put', 'delete', 'patch'].reduce((APIClient, httpMethod) => {
  // eslint-disable-next-line no-param-reassign
  APIClient[httpMethod] = (path, options = {}) => {
    const { query, data } = options;

    const fullPath = `${path.replace(/^\/*/, '')}`;
    const fullUrl = `${API_URL}/${fullPath}`;

    return firebaseAuth.ready.then(() => {
      const currentUser = firebaseAuth.getCurrentUser();

      if (currentUser !== null) {
        return currentUser.getIdToken(FORCE_TOKEN_REFRESH);
      }

      return '';
    })
    .then((token) => {
      const request = superagent[httpMethod](fullUrl);

      request.set('Accept', 'application/json; charset=utf-8');
      request.set('Content-Type', 'application/json');
      request.set(AUTH_HEADER_NAME, token);

      if (exists(query) && typeof query === 'object') {
        request.query(query);
      }

      if (exists(data) && typeof data === 'object') {
        request.send(data);
      }

      return request.then((response) => {
        let jsonified;
        try {
          jsonified = JSON.parse(response.text);
        } catch (e) {
          jsonified = {};
        }

        return jsonified;
      });
    })
    .catch((err) => {
      const message = err.response && err.response.text;
      return Promise.reject(new Error(message));
    });
  };

  return APIClient;
}, {});
