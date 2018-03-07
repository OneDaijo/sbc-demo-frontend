import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';

import ProfileMenu from '../../shared/ProfileMenu';

import colors from '../../../utils/colors';

import logoSrc from '../../../../assets/img/daijo-logo-v2-light.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const styles = {
  main: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '60px',
    backgroundColor: colors.BLUE_DARK,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: '0px 60px',
  },
  logoContainer: {
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    marginRight: '15px',
    marginLeft: '15px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    lineHeight: '21px',
  },
  activeLink: {
    extend: 'link',
    color: colors.WHITE,
    fontWeight: 'bold',
    borderBottom: `3px solid ${colors.WHITE}`,
    marginTop: '19px',
    paddingBottom: '16px',
  },
  notificationsIcon: {
    cursor: 'pointer',
  },
  tooltip: {
    opacity: '1 !important',
  },
  tooltipContainer: {
    width: '346px',
  },
  profileMenuContainer: {
    marginLeft: '30px',
  },
};

class Header extends Component {
  render() {
    const {
      classes,
      user: {
        qinBalance,
        firstName: borrowerName
      },
    } = this.props;

    const activeLinkClassName = classnames(classes.link, classes.activeLink);

    return (
      <div className={ classes.main }>
        <NavLink to="/">
          <div className={ classes.logoContainer }>
            <img alt="" src={ logoSrc } />
          </div>
        </NavLink>
        <div className={ classes.nav }>
          <NavLink className={ classes.link } activeClassName={ activeLinkClassName } to="/dashboard/loans">Loans</NavLink>
          <NavLink className={ classes.link } activeClassName={ activeLinkClassName } to="/dashboard/qin">QIN</NavLink>
          <NavLink className={ classes.link } activeClassName={ activeLinkClassName } to="/dashboard/archive">Archive</NavLink>
        </div>
        <div className={ classes.links }>
          <div className={ classes.profileMenuContainer }>
            <ProfileMenu
              borrowerName={ borrowerName }
              qinBalance={ qinBalance }
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = propTypes;
export default connect(
  ({ user }) => ({ user: user.user }),
)(injectSheet(styles)(Header));
