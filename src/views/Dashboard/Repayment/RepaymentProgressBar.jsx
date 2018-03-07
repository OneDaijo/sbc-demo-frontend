import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../../utils/colors';


const propTypes = {
  classes: PropTypes.object.isRequired,
  outerBarClassName: PropTypes.string,
  percent: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  progressBarClassName: PropTypes.string,
};

const defaultProps = {
  outerBarClassName: '',
  percent: 0,
  progressBarClassName: '',
};


const MIN_WIDTH_PERCENT = 3;
const styles = {
  outerBar: {
    width: '100%',
    height: '12px',
    backgroundColor: 'rgba(0, 134, 191, 0.1)',
    borderRadius: '100px',
    transform: 'matrix(1, 0, 0, -1, 0, 0)',
  },
  progressBar: {
    width: ({ percent }) => `${Math.max(parseFloat(percent), MIN_WIDTH_PERCENT)}%`,
    transition: 'width 500s',
    height: '100%',
    backgroundColor: colors.BLUE,
    borderRadius: '100px',
    transform: 'matrix(1, 0, 0, -1, 0, 0)',
  },
};

class RepaymentProgressBar extends PureComponent {
  render() {
    const {
      classes,
      outerBarClassName: outerBarClassFromProps,
      progressBarClassName: progressBarClassFromProps,
    } = this.props;

    const outerBarClass = classnames(classes.outerBar, {
      [outerBarClassFromProps]: outerBarClassFromProps !== '',
    });

    const progressBarClass = classnames(classes.progressBar, {
      [progressBarClassFromProps]: progressBarClassFromProps !== '',
    });

    return (
      <div className={ outerBarClass }>
        <div className={ progressBarClass } />
      </div>
    );
  }
}

RepaymentProgressBar.propTypes = propTypes;
RepaymentProgressBar.defaultProps = defaultProps;
export default injectSheet(styles)(RepaymentProgressBar);
