import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';

import GetLoan from './views/GetLoan';
import Dashboard from './views/Dashboard';
import Loans from './views/Dashboard/Loans';
import Qin from './views/Dashboard/QIN';
import Archive from './views/Dashboard/Archive';


import '../assets/css/global.css';

/**
 * Returns a Route component that will render one component wrapped by another component
 */
function wrapRouteLevelComponent(WrapperComponent) {
  const WrappedComponent = ({ component: ComponentToWrap, ...rest }) => (
    <Route
      render={({ match }) => (
        <WrapperComponent match={ match }>
          <ComponentToWrap { ...rest } />
        </WrapperComponent>
      )}
      { ...rest }
    />
  );
  WrappedComponent.propTypes = {
    component: PropTypes.func.isRequired,
  };

  return WrappedComponent;
}

const DashboardRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Dashboard {...props}>
        <Component {...props} />
      </Dashboard>
    )}
  />
);

const App = () => (
  <div>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/borrowers" />} />
      <Route path="/borrowers" exact component={ GetLoan } />
      <Route path="/dashboard" exact render={() => <Redirect to="/dashboard/loans" />} />
      <DashboardRoute path="/dashboard/loans" component={ Loans } />
      <DashboardRoute path="/dashboard/qin" component={ Qin } />
      <DashboardRoute path="/dashboard/archive" component={ Archive } />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </div>
);

export default App;
