import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

// import colors from '../../utils/colors';

const propTypes = {
  active: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  colorMap: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  buttonClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  styles: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  active: true,
  buttonClassName: '',
  colorMap: {},
  children: null,
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  styles: {},
};

const defaultColors = {
  fill: {
    active: '#0086bf',
    inactive: '#c4c4c4'
  },
  text: {
    active: '#ffffff',
    inactive: '#ffffff',
  },
};

function getColor(active, defaultColorMap, colorMap = {}) {
  return active ? (colorMap.active || defaultColorMap.active) : (colorMap.inactive || defaultColorMap.inactive);
}

const styles = {
  button: {
    borderRadius: '100px',
    backgroundColor: ({ active, colorMap }) => getColor(active, defaultColors.fill, colorMap.fill),
    cursor: ({ active }) => (active ? 'pointer' : 'not-allowed'),
    color: ({ active, colorMap }) => getColor(active, defaultColors.text, colorMap.text),
    paddingTop: '12px',
    paddingRight: '29px',
    paddingBottom: '12px',
    paddingLeft: '29px',
    fontSize: '12px',
    fontWeight: 'normal',
    transition: 'background-color 200ms, color 200ms',
  },
};

const NOOP = () => {};
class Button extends PureComponent {
  render() {
    const {
      active,
      classes,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      buttonClassName: buttonClassFromProps,
    } = this.props;

    const buttonClass = classnames(classes.button, {
      [buttonClassFromProps]: buttonClassFromProps !== '',
    });

    return (
      <button
        className={ buttonClass }
        onClick={ active ? onClick : NOOP }
        onMouseEnter={ onMouseEnter }
        onMouseLeave={ onMouseLeave }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default injectSheet(styles)(Button);
