import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from '../shared/Modal';
import TextField from '../shared/TextField';
import Button from '../shared/Button';

import {
  login as loginAction,
  signup as signupAction,
} from '../../actions/user';

const propTypes = {
  classes: PropTypes.object.isRequired,
  initialMode: PropTypes.oneOf(['login', 'signup']),
  show: PropTypes.bool,
  signupDisabled: PropTypes.bool,
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
const defaultProps = {
  initialMode: 'login',
  show: false,
  signupDisabled: false,
  user: {},
};
const styles = {
  modal: {
    padding: '40px',
    width: '420px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  input: {
    marginTop: '30px',
    width: '100%',
  },
  button: {
    marginTop: '30px',
  },
};

const exists = val => val !== undefined && val !== null;

class AuthModal extends Component {
  constructor(props) {
    super();

    const initialMode = props.signupDisabled ? 'login' : props.initialMode;
    this.state = {
      mode: initialMode,
      email: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      onHide,
      user,
    } = this.props;

    const {
      loading: currLoading,
      user: currUser = {},
    } = user;

    const {
      loading: nextLoading,
      user: nextUser = {},
    } = nextProps.user;


    const userFinishedLoading = currLoading && !nextLoading;
    const authSuccess = !exists(currUser && currUser.uid) && exists(nextUser && nextUser.uid);

    if (userFinishedLoading && authSuccess) {
      onHide();
    }
  }

  login() {
    const { login } = this.props;
    const { email, password } = this.state;

    login({ email, password });
  }

  signup() {
    const { signup } = this.props;
    const { email, password } = this.state;

    signup({ email, password });
  }

  render() {
    const {
      classes,
      show,
      onHide,
      user: { loading },
    } = this.props;

    const {
      mode,
      email,
      password,
    } = this.state;

    const modeText = mode === 'login' ? 'Log In' : 'Sign Up';

    const areFieldsPopulated = email.length > 0 && password.length > 0;
    const enableButton = !loading && areFieldsPopulated;

    return (
      <Modal
        show={ show }
        modalClassName={ classes.modal }
        onCloseClick={ onHide }
      >
        <div className={ classes.title }>{ modeText }</div>
        <TextField
          id="AuthModal:TextField:email"
          label="Email"
          onChange={ event => this.setState({ email: event.target.value }) }
          value={ email }
          className={ classes.input }
          rootClassName={ classes.input }
        />
        <TextField
          id="AuthModal:TextField:password"
          label="Password"
          onChange={ event => this.setState({ password: event.target.value }) }
          value={ password }
          className={ classes.input }
          rootClassName={ classes.input }
          type="password"
        />
        <Button
          active={ enableButton }
          buttonClassName={ classes.button }
          onClick={ mode === 'login' ? this.login : this.signup }
        >
          { modeText }
        </Button>
      </Modal>
    );
  }
}

AuthModal.propTypes = propTypes;
AuthModal.defaultProps = defaultProps;
export default connect(
  ({ user }) => ({ user }),
  dispatch => bindActionCreators({ login: loginAction, signup: signupAction }, dispatch),
)(injectSheet(styles)(AuthModal));
