import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AuthModal from '../AuthModal';
import ProfileMenu from '../shared/ProfileMenu';
import colors from '../../utils/colors';

import {
  logout as logoutAction,
} from '../../actions/user';

import logoSrc from '../../../assets/img/daijo-logo-v2-light.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
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
    padding: '20px 40px',
    minWidth: '500px',
    '@media (min-width: 1200px)': {
      padding: '20px 40px',
    },
    '@media (min-width: 1500px)': {
      padding: '50px 40px',
    },
  },
  headerItem: {
    fontWeight: 'normal',
    fontSize: '14px',
    color: colors.WHITE,
    lineHeight: '21px',
    marginRight: '30px',
    cursor: 'pointer',
    '@media (min-width: 1200px)': {
      marginRight: '30px',
    },
    '@media (min-width: 1500px)': {
      marginRight: '30px',
    },
  },
  imageContainer: {
    justifySelf: 'flex-start',
    marginRight: 'auto',
  },
  image: {
    width: '104px',
    height: '24px',
  },
  activeLink: {
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '30px',
    '@media (min-width: 1200px)': {
      marginRight: '30px',
    },
    '@media (min-width: 1500px)': {
      marginRight: '30px',
    },
  },
  button: {
    backgroundColor: '#004870',
    color: colors.WHITE,
    paddingTop: '16px',
    paddingRight: '32px',
    paddingBottom: '15px',
    paddingLeft: '34px',
    borderWidth: '0px',
  },
  avatar: {
    border: `2px solid ${colors.WHITE}`,
  },
};

class BorrowerLandingHeader extends PureComponent {
  constructor() {
    super();
    this.state = {
      showAuthModal: false,
    };
  }

  render() {
    const {
      classes,
      user,
      logout,
    } = this.props;

    const {
      showAuthModal,
    } = this.state;

    const userExists = user.user && user.user.uid;
    const Auth = !userExists && (
      <AuthModal
        initialMode="login"
        show={ showAuthModal }
        onHide={ () => this.setState({ showAuthModal: false }) }
        signupDisabled
      />
    );

    let dashboardLink;
    let authLink;
    if (userExists) {
      dashboardLink = (
        <NavLink to="/dashboard" className={ classes.headerItem }>
          Dashboard
        </NavLink>
      );

      const { firstName, qinBalance } = user.user;
      authLink = (
        <div
          className={ classes.headerItem }
        >
          <ProfileMenu
            borrowerName={ firstName }
            qinBalance={ qinBalance }
            avatarClassName={ classes.avatar }
          />
        </div>
      );
    } else {
      authLink = (
        <div
          className={ classes.headerItem }
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
              src={ logoSrc }
            />
          </NavLink>
          { dashboardLink }
          <a
            href="mailto:info@onedaijo.com"
            target="_blank"
            rel="noopener noreferrer"
            className={ classes.headerItem }
          >
            Contact
          </a>
          { authLink }
        </div>
      </div>
    );
  }
}

BorrowerLandingHeader.propTypes = propTypes;
export default connect(
  ({ user }) => ({ user }),
  dispatch => bindActionCreators({ logout: logoutAction }, dispatch),
)(injectSheet(styles)(BorrowerLandingHeader));
