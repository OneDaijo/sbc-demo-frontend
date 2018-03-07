import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

const propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

const styles = {
  main: {},
  headerBar: {
    padding: '15px 20px 14px',
    backgroundColor: '#dddddd',
    marginBottom: '50px',
  },
  navItem: {
    margin: '0px 5px',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '20px',
  },
  notifications: {
    display: 'inline-block',
  },
  content: {
    padding: '15px 20px 14px',
  },
};

const Header = ({ classes, children }) => (
  <div className={ classes.main }>
    <div className={ classes.headerBar }>
      <div className={ classes.flexContainer }>
        <Link className={ classes.navItem } to="/loans">My Loans</Link>
        <Link className={ classes.navItem } to="/profile">My Account</Link>
        <div className={ classes.navItem }>Notifications</div>
      </div>
    </div>
    <div className={ classes.content }>
      { children }
    </div>
  </div>
);

Header.propTypes = propTypes;
export default injectSheet(styles)(Header);
