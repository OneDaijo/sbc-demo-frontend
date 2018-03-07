import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthModal from '../AuthModal';
import ProfileMenu from '../shared/ProfileMenu';

import {
  login as loginAction,
  logout as logoutAction,
} from '../../actions/user';

import logo from '../../../assets/img/daijo-logo-v2-dark-blue.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const styles = {
  main: {
    position: 'relative',
  },
  header: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '36px 60px 33px',
    minWidth: '992px',
    '@media (min-width: 1200px)': {
      padding: '36px 60px 33px',
    },
    '@media (min-width: 1500px)': {
      padding: '36px 60px 33px',
    },
  },
  imageContainer: {
    marginRight: 'auto',
  },
  links: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  link: {
    fontSize: '14px',
    fontWeight: 'normal',
    marginLeft: '33px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, .87)',
  },
  text: {
    color: 'rgba(0, 0, 0, .87)',
  },
};


class Header extends Component {
  constructor() {
    super();
    this.state = {
      showAuthModal: false,
    };
  }

  render() {
    const {
      classes,
      login,
      logout,
      user,
    } = this.props;

    const {
      showAuthModal,
    } = this.state;

    const userExists = user.user && user.user.uid;
    const Auth = !userExists && (
      <AuthModal
        initialMode="signup"
        show={ showAuthModal }
        onLogin={ login }
        onHide={ () => this.setState({ showAuthModal: false }) }
        signupDisabled
      />
    );

    let dashboardLink;
    let authLink;
    if (userExists) {
      dashboardLink = (
        <NavLink to="/dashboard" className={ classes.link }>
          Dashboard
        </NavLink>
      );

      const { firstName, qinBalance } = user.user;
      authLink = (
        <div
          className={ classes.link }
        >
          <ProfileMenu
            borrowerName={ firstName }
            qinBalance={ qinBalance }
            nameClassName={ classes.text }
          />
        </div>
      );
    } else {
      authLink = (
        <div
          className={ classes.link }
          onClick={ () => this.setState({ showAuthModal: true }) }
        >
          Sign in
        </div>
      );
    }

    return (
      <div className={ classes.main }>
        { Auth }
        <div className={ classes.header }>
          <NavLink to="/" className={ classes.imageContainer }>
            <img
              alt="daijo-logo"
              className={ classes.image }
              src={ logo }
            />
          </NavLink>
          { dashboardLink }
          <div className={ classes.links }>
            <a
              className={ classes.link }
              href="https://www.onedaijo.com/#faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Help
            </a>
            { authLink }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = propTypes;
export default connect(
  ({ user }) => ({ user }),
  dispatch => bindActionCreators({
    login: loginAction,
    logout: logoutAction,
  }, dispatch),
)(injectSheet(styles)(Header));
