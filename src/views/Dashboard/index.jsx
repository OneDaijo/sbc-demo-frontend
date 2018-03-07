import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  loadUser as loadUserAction,
} from '../../actions/user';

import {
  loadActiveLoan as loadActiveLoanAction,
} from '../../actions/activeLoan';

import {
  loadLoans as loadLoansAction,
} from '../../actions/loans';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  history: PropTypes.object.isRequired,
  activeLoan: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loadActiveLoan: PropTypes.func.isRequired,
  loadLoans: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const defaultProps = {
  children: null,
};


const exists = val => val !== null && val !== undefined;

class Dashboard extends Component {
  componentDidMount() {
    const { loadLoans, loadUser, loadActiveLoan } = this.props;

    loadLoans();
    loadUser();
    loadActiveLoan();
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      user: { loggingOut: currLoggingOut, loading: currLoading, user },
    } = this.props;

    const {
      user: { loggingOut: nextLoggingOut, loading: nextLoading, user: nextUser },
    } = nextProps;

    const logoutComplete = currLoggingOut && !nextLoggingOut;
    const userLoggedOut = logoutComplete && exists(user && user.uid) && !exists(nextUser && nextUser.uid);
    const noUser = currLoading && !nextLoading && !exists(nextUser && nextUser.uid);

    if (userLoggedOut || noUser) {
      history.replace('/');
    }
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        { children }
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
export default connect(
  ({ user, activeLoan }) => ({ user, activeLoan }),
  dispatch => bindActionCreators({
    loadActiveLoan: loadActiveLoanAction,
    loadLoans: loadLoansAction,
    loadUser: loadUserAction,
  }, dispatch),
)(Dashboard);

