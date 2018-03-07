import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';

import LoanDetails from './LoanDetails';
import BorrowerDetails from './BorrowerDetails';
import EmploymentDetails from './EmploymentDetails';
// import TermsAgreement from './TermsAgreement';
import FormCard from '../FormCard';
import FormButtons from '../FormButtons';

import colors from '../../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  onGoBack: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  accountFirstName: PropTypes.string,
  accountLastName: PropTypes.string,
  accountDateOfBirth: PropTypes.string,
  accountPhoneNumber: PropTypes.string,
  employmentStatus: PropTypes.string,
  employmentJobTitle: PropTypes.string,
  employmentStartMonth: PropTypes.number,
  employmentStartYear: PropTypes.number,
  employmentEducation: PropTypes.string,
  residenceAddr1: PropTypes.string,
  residenceAddr2: PropTypes.string,
  residenceDistrict: PropTypes.string,
  residenceCity: PropTypes.string,
  residencePostal: PropTypes.string,
  residenceProvince: PropTypes.string,
  residenceStatus: PropTypes.string,
  residenceRentAmt: PropTypes.number,
  loanMemo: PropTypes.string,
  loanAmount: PropTypes.number,
  termsAgreed: PropTypes.bool,
  // onTermsCheckboxClick: PropTypes.func.isRequired,
  requestError: PropTypes.string,
};

const defaultProps = {
  onGoBack: () => {},
  accountFirstName: '',
  accountLastName: '',
  accountDateOfBirth: '',
  accountPhoneNumber: '',
  employmentStatus: '',
  employmentJobTitle: '',
  employmentStartMonth: 0,
  employmentStartYear: 0,
  employmentEducation: '',
  residenceAddr1: '',
  residenceAddr2: '',
  residenceDistrict: '',
  residenceCity: '',
  residencePostal: '',
  residenceProvince: '',
  residenceStatus: '',
  residenceRentAmt: 0,
  loanMemo: '',
  loanAmount: 0,
  termsAgreed: false,
  requestError: '',
};

const styles = {
  title: {
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
  },
  flexContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  formButtons: {
    marginTop: '40px',
    width: '100%',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: colors.GRAY_LIGHT,
    marginTop: '30px',
    marginBottom: '30px',
  },
  error: {
    color: '#d60000',
    marginTop: '20px',
    fontSize: '14px',
  },
};


class Review extends Component {
  render() {
    const {
      classes,
      onGoBack,
      onSubmit,
      accountFirstName,
      accountLastName,
      accountDateOfBirth,
      accountPhoneNumber,
      employmentStatus,
      employmentJobTitle,
      employmentStartMonth,
      employmentStartYear,
      employmentEducation,
      residenceAddr1,
      residenceAddr2,
      residenceDistrict,
      residenceCity,
      residencePostal,
      residenceProvince,
      residenceStatus,
      residenceRentAmt,
      loanMemo,
      loanAmount,
      termsAgreed,
      requestError,
    } = this.props;

    return (
      <FormCard>
        <div className={ classes.title }>Review application</div>
        <div className={ classes.flexContent }>
          <LoanDetails
            loanMemo={ loanMemo }
            loanAmount={ numeral(loanAmount).value() }
          />
          <div className={ classes.divider } />
          <BorrowerDetails
            borrowerFirstName={ accountFirstName }
            borrowerLastName={ accountLastName }
            borrowerDateOfBirth={ accountDateOfBirth }
            borrowerPhoneNumber={ accountPhoneNumber }
            residenceAddr1={ residenceAddr1 }
            residenceAddr2={ residenceAddr2 }
            residenceCity={ residenceCity }
            residenceDistrict={ residenceDistrict }
            residencePostal={ residencePostal }
            residenceProvince={ residenceProvince }
            residenceRentAmt={ numeral(residenceRentAmt).value() }
            residenceStatus={ residenceStatus }
          />
          <div className={ classes.divider } />
          <EmploymentDetails
            employmentStatus={ employmentStatus }
            employmentJobTitle={ employmentJobTitle }
            employmentStartMonth={ employmentStartMonth }
            employmentStartYear={ employmentStartYear }
            employmentEducation={ employmentEducation }
          />
          <FormButtons
            className={ classes.formButtons }
            onSubmitClick={ onSubmit }
            onGoBackClick={ onGoBack }
            buttonEnabled={ termsAgreed }
            submit
          />
        </div>
        <div className={ classes.error }>{ requestError }</div>
      </FormCard>
    );
  }
}

Review.propTypes = propTypes;
Review.defaultProps = defaultProps;
export default injectSheet(styles)(Review);
