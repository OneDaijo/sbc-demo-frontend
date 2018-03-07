import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cookie from 'cookie';

import Modal from '../shared/Modal';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const defaultProps = {};

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
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.7)',
  },
};

const COOKIE_NAME = 'onedaijo_demo_first_landing';
class IntroModal extends PureComponent {
  constructor() {
    super();

    let cookies = {};
    if (typeof document === 'object') {
      cookies = cookie.parse(document.cookie);
    }

    const show = cookies[COOKIE_NAME] === undefined;

    this.state = { show };
    this.onDismissClick = this.onDismissClick.bind(this);
  }

  onDismissClick() {
    if (typeof document === 'object') {
      const introShownCookie = `${COOKIE_NAME}=${Date.now()};`;
      document.cookie = introShownCookie;
      this.setState({ show: false });
    }
  }

  render() {
    const {
      classes,
    } = this.props;

    const {
      show,
    } = this.state;

    if (!show) {
      return null;
    }

    return (
      <Modal
        modalClassName={ classes.modal }
        onCloseClick={ this.onDismissClick }
        show
      >
        <div className={ classes.title }>Welcome to our demo!</div>
        <div className={ classes.body }>
          One Daijo encrypts the transport and storage of data throughout our system.&nbsp;
          However, as this is simply a demo, we do not expect you to input your real financial or
          personal information. We do, however, request that you give us a valid email as we will
          need it to verify your account. For the optimal demo experience, please input realistic
          information as our models are trained on real-life data.
          <br />
          <br />
          We will not share your email or any other information with third parties.&nbsp;
          All of your data will be deleted from our system as soon as the demo period ends.
        </div>
      </Modal>
    )
  }
}

IntroModal.propTypes = propTypes;
IntroModal.defaultProps = defaultProps;
export default injectSheet(styles)(IntroModal);
