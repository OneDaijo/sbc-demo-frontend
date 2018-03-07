import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Checkbox from '../../shared/Checkbox';

const propTypes = {
  classes: PropTypes.object.isRequired,
  termsAgreed: PropTypes.bool,
  onTermsCheckboxClick: PropTypes.func,
};

const defaultProps = {
  termsAgreed: false,
  onTermsCheckboxClick: () => {},
};

const styles = {
  main: {
    width: '100%',
  },
  labelText: {
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  link: {
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
    textDecoration: 'underline',
  },
};


const TERMS_URL = '';
const DATA_TERMS_URL = '';
const PRIVACY_POLICY_URL = '';

class TermsAgreement extends Component {
  render() {
    const {
      classes,
      onTermsCheckboxClick,
      termsAgreed,
    } = this.props;

    const label = (
      <div className={ classes.labelText }>
        I agree to the&nbsp;
        <a className={ classes.link } href={ TERMS_URL } target="_blank">Terms of Use</a>,&nbsp;
        <a className={ classes.link } href={ DATA_TERMS_URL } target="_blank">Data Terms of Use</a>, and&nbsp;
        <a className={ classes.link } href={ PRIVACY_POLICY_URL } target="_blank">One Daijo privacy policies</a>.
      </div>
    );

    return (
      <div className={ classes.main }>
        <Checkbox
          checked={ termsAgreed }
          label={ label }
          onChange={ event => onTermsCheckboxClick(event.target.checked) }
          value="terms"
        />
      </div>
    );
  }
}

TermsAgreement.propTypes = propTypes;
TermsAgreement.defaultProps = defaultProps;
export default injectSheet(styles)(TermsAgreement);
