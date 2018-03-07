import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import injectSheet from 'react-jss';
import Avatar from 'material-ui/Avatar';
import classnames from 'classnames';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tooltip from './ToolTip';

import colors from '../../utils/colors';

import {
  logout as logoutAction,
} from '../../actions/user';

import iconQin from '../../../assets/img/icon-qin-card-logo.svg';
import iconCaret from '../../../assets/img/icon-caret-down-white.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  avatarClassName: PropTypes.string,
  nameClassName: PropTypes.string,
  borrowerName: PropTypes.string,
  qinBalance: PropTypes.number,
  logout: PropTypes.func.isRequired,
};

const defaultProps = {
  borrowerName: '',
  qinBalance: 0,
  avatarClassName: '',
  nameClassName: '',
};

const styles = {
  main: {
    position: 'relative',
  },
  profile: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  blueAvatar: {
    color: colors.WHITE,
    backgroundColor: colors.BLUE,
    cursor: 'pointer',
  },
  nameDropdown: {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.WHITE,
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'row nowrap',
    cursor: 'pointer',
  },
  caret: {
    marginLeft: '10px',
  },
  menuContainer: {
    opacity: '1',
    height: 'auto',
    pointerEvents: 'auto',
    transition: 'opacity 150ms',
    borderRadius: '10px',
    top: '62px',
    left: '19px',
  },
  hide: {
    opacity: '0',
    pointerEvents: 'none',
  },
  menu: {
    minWidth: '260px',
  },
  section: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px 15px',
    cursor: 'pointer',
    borderBottom: `1px solid ${colors.GRAY_XXLIGHT}`,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '28px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  topSection: {
    extend: 'section',
    padding: '18px 19px 21px 21px',
  },
  bottomSection: {
    extend: 'section',
    borderBottom: '0px',
  },
  qinBalanceSection: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  qinBalanceLabel: {
    fontSize: '12px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.38)',
    lineHeight: '20px',
  },
  qinBalanceAmount: {
    fontSize: '24px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  qinIconContainer: {
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qinIcon: {
    maxWidth: '40px',
    maxHeight: '40px',
  },
  menuLink: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '28px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
};

function formatQin(num) {
  return numeral(num).format('0,0.00');
}

class ProfileMenu extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
  }
  render() {
    const {
      classes,
      borrowerName,
      qinBalance,
      logout,
      avatarClassName,
      nameClassName,
    } = this.props;

    const {
      showMenu,
    } = this.state;

    const menuContainerClass = classnames(classes.menuContainer, {
      [classes.hide]: !showMenu,
    });

    const avatarClass = classnames(classes.blueAvatar, {
      [avatarClassName]: avatarClassName !== '',
    });

    const nameClass = classnames(classes.nameDropdown, {
      [nameClassName]: nameClassName !== '',
    });

    const menu = (
      <Tooltip
        placement="bottom"
        containerClassName={ menuContainerClass }
      >
        <div className={ classes.menu }>
          <NavLink to="/dashboard/qin" className={ classes.topSection }>
            <div className={ classes.qinBalanceSection }>
              <div className={ classes.qinBalanceLabel }>Available QIN Balance</div>
              <div className={ classes.qinBalanceAmount }>{ formatQin(qinBalance) } QIN</div>
            </div>
            <div className={ classes.qinIconContainer }>
              <img src={ iconQin } alt="QIN" className={ classes.qinIcon } />
            </div>
          </NavLink>
          <div
            className={ classes.section }
            onClick={ () => window.open('https://www.onedaijo.com/#faq', '_blank') }
          >
            <a
              className={ classes.menuLink }
              href="https://www.onedaijo.com/#faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get help
            </a>
          </div>
          <div
            className={ classes.bottomSection }
            onClick={ logout }
          >
            Sign out
          </div>
        </div>
      </Tooltip>
    );

    const firstLetter = borrowerName[0];

    return (
      <div className={ classes.main }>
        <div
          className={ classes.profile }
          onClick={ () => this.setState({ showMenu: !showMenu }) }
        >
          <Avatar className={ avatarClass }>{ firstLetter && firstLetter.toUpperCase() }</Avatar>
          <div className={ nameClass }>
            { borrowerName }
            <img
              alt=""
              src={ iconCaret }
              className={ classes.caret }
            />
          </div>
        </div>
        { menu }
      </div>
    );
  }
}

ProfileMenu.propTypes = propTypes;
ProfileMenu.defaultProps = defaultProps;
export default connect(
  () => ({}),
  dispatch => bindActionCreators({ logout: logoutAction }, dispatch),
)(injectSheet(styles)(ProfileMenu));
