/* Import statements */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { AppContainer } from 'react-hot-loader';

import reducers from './reducers';
import { firebaseInit } from './firebaseHelpers';

import App from './App';

firebaseInit();
const reduxStore = createStore(
  reducers,
  {},
  applyMiddleware(promiseMiddleware()),
);

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter basename="/demo">
      <Provider store={ reduxStore }>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
