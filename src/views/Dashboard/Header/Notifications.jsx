import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Notification from './Notification';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  children: null,
};

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  title: {
    width: '100%',
    padding: '20px 27px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  messages: {
    width: '100%',
  },
  bottom: {
    width: '100%',
    padding: '20px 21px',
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'left'
  },
};


class Notifications extends Component {
  render() {
    // const {
    //   children,
    //   classes,
    // } = this.props;

    // const isNotificationsEmpty = !children || children.length === 0;
    // let notifications = children;
    // if (isNotificationsEmpty) {
    //   notifications = (
    //     <Notification>
    //       You do not currently have any notifications.
    //     </Notification>
    //   );
    // }

    // // TODO: need to make "see older notifications" do something
    // return (
    //   <div className={ classes.main }>
    //     <div className={ classes.title }>Notifications</div>
    //     { notifications }
    //     <div className={ classes.bottom }>
    //       <a href="javascript:void(0)">See older notifications</a>
    //     </div>
    //   </div>
    // );
    return (
      <div />
    );
  }
}

Notifications.propTypes = propTypes;
Notifications.defaultProps = defaultProps;
export default injectSheet(styles)(Notifications);
