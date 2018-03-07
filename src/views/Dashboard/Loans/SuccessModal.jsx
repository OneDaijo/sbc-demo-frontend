import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Modal from '../../shared/Modal';
import Button from '../../shared/Button';

const propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool,
  isDemoEnd: PropTypes.bool,
  qinReward: PropTypes.number,
  onRestartDemo: PropTypes.func,
  onHide: PropTypes.func,
};
const defaultProps = {
  show: false,
  isDemoEnd: false,
  qinReward: 0,
  onRestartDemo: () => {},
  onHide: () => {},
};

const styles = {
  modal: {
    padding: '40px',
    maxWidth: '700px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    textAlign: 'center',
  },
  body: {
    marginTop: '2px',
    fontSize: '18px',
    lineHeight: '26px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  button: {
    display: 'block',
    marginTop: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '14px',
    paddingTop: '16px',
    paddingRight: '30px',
    paddingBottom: '15px',
    paddingLeft: '30px',
  },
};


class SuccessModal extends PureComponent {
  render() {
    const {
      classes,
      show,
      isDemoEnd,
      qinReward,
      onRestartDemo,
      onHide,
    } = this.props;

    if (!show) {
      return null;
    }

    let content;
    if (isDemoEnd) {
      content = (
        <div>
          <div className={ classes.body }>
            You&apos;ve completed our demo! That&apos;s all we have for now.&nbsp;
            You can continue to explore your personal dashboard and repeat the borrowing experience.&nbsp;
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <div className={ classes.body }>
            You just repaid your first loan and earned { qinReward } QIN! Having more QIN allows you to request
            loans of greater value.  Click the button below to return to the start and see your new buying power in
            action.
          </div>
          <Button
            buttonClassName={ classes.button }
            onClick={ onRestartDemo }
          >
            Back to start
          </Button>
        </div>
      );
    }

    return (
      <Modal
        modalClassName={ classes.modal }
        onCloseClick={ onHide }
        show
      >
        <div className={ classes.title }>Congratulations! <span role="img">🎉</span></div>
        { content }
      </Modal>
    );
  }
}

SuccessModal.propTypes = propTypes;
SuccessModal.defaultProps = defaultProps;
export default injectSheet(styles)(SuccessModal);
