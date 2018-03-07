import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import validator from 'validator';
import classnames from 'classnames';
import moment from 'moment';

import FormCard from './FormCard';
import FormButtons from './FormButtons';
import TextField from '../shared/TextField';

const propTypes = {
  classes: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dateOfBirth: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  signupError: PropTypes.string,
  signupLoading: PropTypes.bool,
  userIsLoggedIn: PropTypes.bool,
  onFirstNameChange: PropTypes.func.isRequired,
  onLastNameChange: PropTypes.func.isRequired,
  onDateOfBirthChange: PropTypes.func.isRequired,
  onPhoneNumberChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  onCreateAccount: PropTypes.func.isRequired,
  onGoBack: PropTypes.func,
};

const defaultProps = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  signupError: '',
  signupLoading: false,
  userIsLoggedIn: false,
  onGoBack: () => {},
};

const styles = {
  title: {
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
  },
  inputGroup: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  textWithLabelGroup: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  textWithLabelGroupShort: {
    position: 'relative',
    width: '200px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  errorMessage: {
    position: 'absolute',
    bottom: '-15px',
    fontSize: '12px',
    textAlign: 'left',
    fontWeight: '500',
    color: '#d60000',
    opacity: '1',
    transition: 'opacity .25s',
  },
  hide: {
    opacity: '0',
  },
  textFieldRootShort: {
    width: '200px',
  },
  textFieldRootLong: {
    width: '420px',
  },
  formButtonsContainer: {
    marginTop: '40px',
    width: '100%',
  },
  textFieldMargin: {
    marginTop: '30px',
  },
  signupError: {
    color: '#d60000',
    marginTop: '20px',
    fontSize: '14px',
  },
};

const MIN_PASSWORD_LENGTH = 8;

class CreateAccountFormCard extends Component {
  render() {
    const {
      classes,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      email,
      password,
      confirmPassword,
      signupError,
      signupLoading,
      userIsLoggedIn,
      onFirstNameChange,
      onLastNameChange,
      onDateOfBirthChange,
      onPhoneNumberChange,
      onEmailChange,
      onPasswordChange,
      onConfirmPasswordChange,
      onGoBack,
      onCreateAccount,
    } = this.props;

    const mDob = moment(dateOfBirth, 'MM/DD/YYYY');

    const isValidPassword = password.trim().length >= MIN_PASSWORD_LENGTH;
    const isValidConfirmPassword = isValidPassword && confirmPassword === password;
    const isValidPhone = typeof phoneNumber === 'string' && validator.isMobilePhone(phoneNumber, 'any');
    const isValidEmail = typeof email === 'string' && validator.isEmail(email);
    const isValidDate = dateOfBirth.replace(/\s/, '').length >= 10 && mDob.isValid();
    const isUserOfAge = isValidDate && moment().diff(mDob, 'years') >= 21;

    const buttonEnabled = userIsLoggedIn || (
      !signupLoading
      && firstName !== ''
      && lastName !== ''
      && isValidDate
      && isUserOfAge
      && isValidPhone
      && isValidEmail
      && isValidPassword
      && isValidConfirmPassword
    );

    const phoneNumberErrorClass = classnames(classes.errorMessage, {
      [classes.hide]: userIsLoggedIn || isValidPhone,
    });
    const phoneNumberError = (
      <div className={ phoneNumberErrorClass }>Please enter a valid phone number.</div>
    );

    const emailErrorClass = classnames(classes.errorMessage, {
      [classes.hide]: userIsLoggedIn || isValidEmail,
    });
    const emailError = (
      <div className={ emailErrorClass }>Please enter a valid email.</div>
    );

    const dobErrorClass = classnames(classes.errorMessage, {
      [classes.hide]: isValidDate && isUserOfAge,
    });
    let dobErrorString;
    if (!isValidDate) {
      dobErrorString = 'Please enter a valid date.';
    } else if (!isUserOfAge) {
      dobErrorString = 'You must be at least 21 years old.';
    }
    const dobError = (
      <div className={ dobErrorClass }>{ dobErrorString }</div>
    );

    const passwordErrorClass = classnames(classes.errorMessage, {
      [classes.hide]: userIsLoggedIn || isValidPassword,
    });
    const passwordError = (
      <div className={ passwordErrorClass }>Password must be at least 8 characters.</div>
    );

    const confirmPasswordErrorClass = classnames(classes.errorMessage, {
      [classes.hide]: userIsLoggedIn || isValidConfirmPassword,
    });
    const confirmPasswordError = (
      <div className={ confirmPasswordErrorClass }>Passwords must match.</div>
    );

    // don't need to show this if user is already logged in
    const confirmPasswordGroup = !userIsLoggedIn && (
      <div className={ classes.textWithLabelGroup }>
        <TextField
          id="GetLoan:SecondQuestion:confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={ event => onConfirmPasswordChange(event.target.value) }
          value={ confirmPassword }
          className={ classes.textFieldMargin }
          rootClassName={ classes.textFieldRootLong }
          disabled={ userIsLoggedIn }
        />
        { confirmPasswordError }
      </div>
    );

    let displayPassword = password;
    if (userIsLoggedIn) {
      displayPassword = '********';
    }

    const titleText = userIsLoggedIn ? 'Confirm your account' : 'Create your account';
    return (
      <FormCard>
        <div className={ classes.title }>{ titleText }</div>
        <div className={ classes.inputGroup }>
          <TextField
            id="GetLoan:SecondQuestion:firstName"
            label="First name"
            onChange={ event => onFirstNameChange(event.target.value) }
            value={ firstName }
            rootClassName={ classes.textFieldRootShort }
            disabled={ userIsLoggedIn }
          />
          <TextField
            id="GetLoan:SecondQuestion:lastName"
            label="Last name"
            onChange={ event => onLastNameChange(event.target.value) }
            value={ lastName }
            rootClassName={ classes.textFieldRootShort }
            disabled={ userIsLoggedIn }
          />
        </div>
        <div className={ classes.inputGroup }>
          <div className={ classes.textWithLabelGroupShort }>
            <TextField
              id="GetLoan:SecondQuestion:dateOfBirth"
              label="Date of birth"
              onChange={ event => onDateOfBirthChange(event.target.value) }
              value={ dateOfBirth }
              mask={ [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] }
              rootClassName={ classes.textFieldRootShort }
              disabled={ userIsLoggedIn }
            />
            { dobError }
          </div>
          <div className={ classes.textWithLabelGroupShort }>
            <TextField
              id="GetLoan:SecondQuestion:phoneNumber"
              label="Phone number"
              onChange={ event => onPhoneNumberChange(event.target.value) }
              value={ phoneNumber }
              rootClassName={ classes.textFieldRootShort }
              disabled={ userIsLoggedIn }
            />
            { phoneNumberError }
          </div>
        </div>
        <div className={ classes.textWithLabelGroup }>
          <TextField
            id="GetLoan:SecondQuestion:email"
            label="Email address"
            onChange={ event => onEmailChange(event.target.value) }
            value={ email }
            className={ classes.textFieldMargin }
            rootClassName={ classes.textFieldRootLong }
            disabled={ userIsLoggedIn }
          />
          { emailError }
        </div>
        <div className={ classes.textWithLabelGroup }>
          <TextField
            id="GetLoan:SecondQuestion:password"
            label="Password"
            type="password"
            onChange={ event => onPasswordChange(event.target.value) }
            value={ displayPassword }
            className={ classes.textFieldMargin }
            rootClassName={ classes.textFieldRootLong }
            disabled={ userIsLoggedIn }
          />
          { passwordError }
        </div>
        { confirmPasswordGroup }
        <FormButtons
          className={ classes.formButtonsContainer }
          buttonEnabled={ buttonEnabled }
          onNextClick={ onCreateAccount }
          onGoBackClick={ onGoBack }
        />
        <div className={ classes.signupError }>{ signupError }</div>
      </FormCard>
    );
  }
}

CreateAccountFormCard.propTypes = propTypes;
CreateAccountFormCard.defaultProps = defaultProps;
export default injectSheet(styles)(CreateAccountFormCard);
