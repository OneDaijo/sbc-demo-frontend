import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../../utils/colors';
import CloseIcon from '../CloseIcon';

const propTypes = {
  classes: PropTypes.object.isRequired,
  modalClassName: PropTypes.string,
  overlayClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onModalClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  show: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  modalClassName: '',
  overlayClassName: '',
  children: null,
  onCloseClick: () => {},
  onModalClick: () => {},
  show: false,
};

const styles = {
  main: {
    position: 'fixed',
    opacity: ({ show }) => (show ? '1' : '0'),
    visibility: ({ show }) => (show ? 'visible' : 'hidden'),
    transition: 'opacity .25s, visibility .25s',
    zIndex: '1000',
    top: '0px',
    left: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modal: {
    position: 'relative',
    borderRadius: '8px',
    zIndex: '1001',
    backgroundColor: colors.WHITE,
  },
  overlay: {
    width: '100%',
    height: '100%',
    background: 'rgba(94, 94, 94, 0.25)',
    backdropFilter: 'blur(10px)',
    position: 'absolute',
    top: '0px',
    left: '0px',
  },
  closeIcon: {
    position: 'absolute',
    top: '40px',
    right: '40px',
    zIndex: '1002',
  },
};


class Modal extends PureComponent {
  render() {
    const {
      children,
      classes,
      onCloseClick,
      onModalClick,
      modalClassName,
      overlayClassName,
    } = this.props;

    const overlayClass = classnames(classes.overlay, {
      [overlayClassName]: overlayClassName !== '',
    });

    const modalClass = classnames(classes.modal, {
      [modalClassName]: modalClassName !== '',
    });

    return (
      <div className={ classes.main }>
        <div className={ overlayClass } onClick={ onCloseClick } />
        <div
          className={ modalClass }
          onClick={ onModalClick }
        >
          <CloseIcon onClick={ onCloseClick } className={ classes.closeIcon } />
          { children }
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default injectSheet(styles)(Modal);
