import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../../utils/colors';


const propTypes = {
  arrowClassName: PropTypes.string,
  arrowContainerClassName: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  containerClassName: PropTypes.string,
  id: PropTypes.string,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  show: PropTypes.bool,
};

const defaultProps = {
  arrowClassName: '',
  arrowContainerClassName: '',
  containerClassName: '',
  id: '',
  placement: 'left',
  show: false,
};

const styles = {
  container: {
    position: 'absolute',
    borderRadius: '18px',
    backgroundColor: colors.WHITE,
    boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.25)',
    width: 'auto',
    transition: 'opacity 200ms ease',
    overflow: 'visible',
    zIndex: '10',
    opacity: ({ show }) => (show ? '1' : '0'),
    pointerEvents: ({ show }) => (show ? 'auto' : 'none'),
  },
  containerHorizontal: {
    transform: 'translateY(-50%)',
  },
  containerVertical: {
    transform: 'translateX(-50%)',
  },
  relativeContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    pointerEvents: 'none',
    cursor: 'auto',
    overflow: 'visible',
    height: '30px',
    width: '30px',
    position: 'absolute',
    borderWidth: '0px',
    backgroundColor: 'transparent',
    zIndex: '-1',
  },
  arrowContainerTop: {
    bottom: '-2%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  arrowContainerRight: {
    top: '50%',
    left: '-4%',
    transform: 'translateY(-50%) rotate(270deg)',
  },
  arrowContainerBottom: {
    top: '-2%',
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
  },
  arrowContainerLeft: {
    top: '50%',
    right: '-4%',
    transform: 'rotate(90deg)',
  },
  arrow: {
    position: 'relative',
    pointerEvents: 'auto',
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE,
    borderWidth: '3px',
    borderStyle: 'solid',
    transform: 'rotate(45deg)',
    height: '30px',
    width: '30px',
  },
};


class Tooltip extends PureComponent {
  render() {
    const {
      arrowClassName,
      arrowContainerClassName,
      containerClassName,
      classes,
      children,
      id,
      placement,
    } = this.props;

    const containerClasses = classnames(classes.container, {
      [classes.containerVertical]: placement === 'top' || placement === 'bottom',
      [classes.containerHorizontal]: placement === 'left' || placement === 'right',
      [containerClassName]: containerClassName !== '',
    });

    const arrowClasses = classnames(classes.arrow, {
      [arrowClassName]: arrowClassName !== '',
    });

    const arrowContainerClasses = classnames(classes.arrowContainer, {
      [classes.arrowContainerTop]: placement === 'top',
      [classes.arrowContainerRight]: placement === 'right',
      [classes.arrowContainerBottom]: placement === 'bottom',
      [classes.arrowContainerLeft]: placement === 'left',
      [arrowContainerClassName]: arrowContainerClassName !== '',
    });

    return (
      <div id={ id } className={ containerClasses }>
        <div className={ classes.relativeContainer }>
          <div className={ arrowContainerClasses }>
            <div className={ arrowClasses } />
          </div>
          { children }
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
export default injectSheet(styles)(Tooltip);
