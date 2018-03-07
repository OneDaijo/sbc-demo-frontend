import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../utils/colors';


const propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  sizePx: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  className: '',
  onClick: () => {},
  sizePx: 16,
};

const sqrtTwo = Math.sqrt(2);
const styles = {
  main: {
    transform: 'translateX(50%)',
    position: 'relative',
    width: ({ sizePx }) => `${(sqrtTwo * sizePx)}px`,
    height: ({ sizePx }) => `${(sqrtTwo * sizePx)}px`,
    cursor: 'pointer',
  },
  legOne: {
    position: 'absolute',
    backgroundColor: colors.GRAY_DARK,
    transform: 'rotate(45deg)',
    width: '2px',
    height: ({ sizePx }) => `${sizePx}px`,
  },
  legTwo: {
    position: 'absolute',
    backgroundColor: colors.GRAY_DARK,
    transform: 'rotate(-45deg)',
    width: '2px',
    height: ({ sizePx }) => `${sizePx}px`,
  },
};


class CloseIcon extends PureComponent {
  render() {
    const {
      classes,
      className,
      onClick,
    } = this.props;

    const mainClass = classnames(classes.main, {
      [className]: className !== '',
    });

    return (
      <div className={ mainClass } onClick={ onClick }>
        <div className={ classes.legOne } />
        <div className={ classes.legTwo } />
      </div>
    );
  }
}

CloseIcon.propTypes = propTypes;
CloseIcon.defaultProps = defaultProps;
export default injectSheet(styles)(CloseIcon);
