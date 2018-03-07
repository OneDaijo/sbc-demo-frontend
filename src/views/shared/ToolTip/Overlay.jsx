import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import colors from '../../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

const defaultProps = {
  children: null,
};

const styles = {
  main: {
    position: 'absolute',
    borderRadius: '10px',
    backgroundColor: colors.WHITE,
    boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.25)',
    opacity: '1',
  },
};

class Overlay extends Component {
  render() {
    const {
      classes,
      children,
    } = this.props;

    return (
      <div className={ classes.main }>
        { children }
      </div>
    );
  }
}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
export default injectSheet(styles)(Overlay);
