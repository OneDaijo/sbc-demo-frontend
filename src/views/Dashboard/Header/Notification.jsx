import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import moment from 'moment';

import colors from '../../../utils/colors';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  classes: PropTypes.object.isRequired,
  ts: PropTypes.number,
};

const defaultProps = {
  ts: 0,
};

const styles = {
  main: {
    width: '100%',
    backgroundColor: 'rgba(0, 72, 112, 0.05)',
    borderTop: '1px solid #F0F0F0',
    borderBottom: '1px solid #F0F0F0',
  },
  message: {
    padding: '21px 32px 20px 20px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    color: colors.GRAY_DARK,
  },
  ts: {
    fontSize: '12px',
    lineHeight: '17px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.38)',
  },
};


const SECONDS_IN_A_MINUTE = 60;
const SECONDS_IN_AN_HOUR = 3600;
const SECONDS_IN_A_DAY = 86400;
const SECONDS_IN_A_YEAR = 31540000;

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      messageAge: null,
    };
  }

  componentDidMount() {
    const { ts } = this.props;
    const momentified = moment(ts);

    if (ts > 0) {
      this.interval = setInterval(() => {
        const now = moment();
        const diffSeconds = Math.floor(now.diff(momentified) / 1000);

        let messageAgeString;
        if (diffSeconds < 10) {
          messageAgeString = '< 10 seconds ago';
        } else if (diffSeconds < SECONDS_IN_A_MINUTE) {
          messageAgeString = '< 1 minute ago';
        } else if (diffSeconds < SECONDS_IN_AN_HOUR) {
          messageAgeString = `${Math.floor(diffSeconds / SECONDS_IN_A_MINUTE)} minutes ago`;
        } else if (diffSeconds < SECONDS_IN_A_DAY) {
          messageAgeString = `${Math.floor(diffSeconds / SECONDS_IN_AN_HOUR)} hours ago`;
        } else if (diffSeconds < SECONDS_IN_A_YEAR) {
          messageAgeString = momentified.format('MMM D');
        } else {
          messageAgeString = momentified.format('MMM D, YYYY');
        }

        this.setState({ messageAge: messageAgeString });
      }, 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      classes,
      children,
      ts,
    } = this.props;

    const {
      messageAge,
    } = this.state;

    const tsElement = ts > 0 && <div className={ classes.ts }>{ messageAge }</div>;

    return (
      <div className={ classes.main }>
        <div className={ classes.message }>
          <div className={ classes.messageText }>
            { children }
          </div>
          { tsElement }
        </div>
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
export default injectSheet(styles)(Notification);
