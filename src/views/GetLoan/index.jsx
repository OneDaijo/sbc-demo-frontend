import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';

import IntroModal from './IntroModal';
import BorrowerLanding from './BorrowerLanding';
import Header from './Header';
import ConfirmEmail from './ConfirmEmail';
import LoanInfoFormCard from './LoanInfoFormCard';
import CreateAccountFormCard from './CreateAccountFormCard';
import ResidenceFormCard from './ResidenceFormCard';
import EmploymentFormCard from './EmploymentFormCard';
import Review from './Review';

import purposeOptions from './utils/purposeOptions';
import employmentOptions from './utils/employmentOptions';
import monthOptions from './utils/monthOptions';
import yearOptions from './utils/yearOptions';
import educationOptions from './utils/educationOptions';

import {
  loadActiveLoan as loadActiveLoanAction,
  requestLoan as requestLoanAction,
} from '../../actions/activeLoan';

import {
  loadUser as loadUserAction,
  signup as signupAction,
  updateUser as updateUserAction,
} from '../../actions/user';

import {
  loadLoans as loadLoansAction,
} from '../../actions/loans';

import {
  firebaseAuth,
} from '../../firebaseHelpers';

const propTypes = {
  classes: PropTypes.object.isRequired,
  activeLoan: PropTypes.object.isRequired,
  loans: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  requestLoan: PropTypes.func.isRequired,
  loadActiveLoan: PropTypes.func.isRequired,
  loadLoans: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const styles = {
  main: {
    position: 'relative',
    minWidth: '800px',
    minHeight: '100vh',
    height: 'auto',
    backgroundColor: '#fafafa',
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
    top: '38px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  progressBarContainer: {
    width: '350px',
  },
  percent: {
    fontSize: '14px',
    fontWeight: 'normal',
  },
  content: {
    paddingTop: '100px',
    paddingBottom: '80px',
    minHeight: '100vh',
    height: 'auto',
  },
  confirmEmailContainer: {
    marginBottom: '29px',
  },
};

const STEP_INCREMENT = 20;
const MAX_MEMO_LENGTH = 60;
const MIN_LOAN_AMOUNT = 1000;

const exists = val => val !== undefined && val !== null;

const INITIAL_STATE = {
  percent: 0,
  loanAmount: MIN_LOAN_AMOUNT,
  loanPurpose: '',
  loanMemo: '',
  accountFirstName: '',
  accountLastName: '',
  accountDateOfBirth: '',
  accountPhoneNumber: '',
  accountEmail: '',
  accountPassword: '',
  accountConfirmPassword: '',
  employmentStatus: null,
  employmentJobTitle: null,
  employmentStartMonth: null,
  employmentStartYear: null,
  employmentIncome: null,
  employmentEducation: null,
  residenceAddr1: null,
  residenceAddr2: null,
  residenceDistrict: null,
  residenceCity: null,
  residencePostal: null,
  residenceProvince: null,
  residenceStatus: null,
  residenceRentAmt: null,
  termsAgreed: true,
};

const LOAN_STATES = {
  REPAID: 'REPAID',
};
class GetLoan extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    // this.state = TEST_STATE;

    this.backOneStep = this.backOneStep.bind(this);
    this.progressStep = this.progressStep.bind(this);

    this.memoChange = this.memoChange.bind(this);
    this.requestLoan = this.requestLoan.bind(this);

    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onSubmitResidenceInfo = this.onSubmitResidenceInfo.bind(this);
    this.onSubmitEmploymentInfo = this.onSubmitEmploymentInfo.bind(this);

    this.setStatePropIfNumber = this.setStatePropIfNumber.bind(this);
  }

  componentDidMount() {
    const {
      history,
      loadActiveLoan,
      loadUser,
      activeLoan: { loan },
    } = this.props;


    loadUser();
    if (!exists(loan.id)) {
      loadActiveLoan().catch(() => {});
    } else if (exists(loan.id)) {
      history.replace('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      loadActiveLoan,
      loadLoans,
      user: {
        user: currUser,
        loggingOut: currLoggingOut,
        updating: currUserUpdating,
      },
    } = this.props;

    const {
      activeLoan: { loan: nextLoan },
      user: {
        updatingError: userUpdatingError,
        user: nextUser,
        loggingOut: nextLoggingOut,
        updating: nextUserUpdating,
      },
    } = nextProps;

    const { percent } = this.state;
    const logoutFinished = currLoggingOut && !nextLoggingOut;

    const isSignupStep = percent === 40;
    const userLoggedIn = !exists(currUser.uid) && exists(nextUser.uid);
    if (userLoggedIn) {
      loadActiveLoan();
      loadLoans();
    }

    const loanAlreadyActive = nextUser.uid && exists(nextLoan && nextLoan.id);
    if (loanAlreadyActive) {
      history.replace('/dashboard');
    }

    const userLoggedOut = logoutFinished && !exists(nextUser.uid) && exists(currUser.uid);
    if (userLoggedOut) {
      this.setState(INITIAL_STATE);
    }

    const userSignedUp = userLoggedIn && isSignupStep;
    const userUpdateFinished = currUserUpdating && !nextUserUpdating;
    if (userSignedUp || (userUpdateFinished && !userUpdatingError)) {
      this.progressStep();
    }
  }

  backOneStep() {
    const { percent } = this.state;

    this.setState({ percent: Math.max(0, Math.round(percent - STEP_INCREMENT)) });
  }

  progressStep() {
    const { percent } = this.state;

    this.setState({ percent: Math.round(percent + STEP_INCREMENT) });
  }

  memoChange(value) {
    if (value.length <= MAX_MEMO_LENGTH) {
      this.setState({ loanMemo: value });
    }
  }

  onCreateAccount() {
    const {
      signup,
      user: { user },
    } = this.props;

    if (exists(user && user.uid)) {
      return this.progressStep();
    }

    const {
      accountFirstName,
      accountLastName,
      accountEmail,
      accountPassword,
      accountDateOfBirth,
      accountPhoneNumber,
    } = this.state;

    return signup({
      firstName: accountFirstName,
      lastName: accountLastName,
      email: accountEmail,
      password: accountPassword,
      dateOfBirth: accountDateOfBirth,
      phoneNumber: accountPhoneNumber,
    });
  }

  onSubmitResidenceInfo() {
    const {
      residenceAddr1,
      residenceAddr2,
      residenceDistrict,
      residenceCity,
      residencePostal,
      residenceProvince,
      residenceStatus,
      residenceRentAmt,
    } = this.state;

    const {
      updateUser,
    } = this.props;

    const residenceAddr1Changed = residenceAddr1 !== null;
    const residenceAddr2Changed = residenceAddr2 !== null;
    const residenceDistrictChanged = residenceDistrict !== null;
    const residenceCityChanged = residenceCity !== null;
    const residencePostalChanged = residencePostal !== null;
    const residenceProvinceChanged = residenceProvince !== null;
    const residenceStatusChanged = residenceStatus !== null;
    const residenceRentAmtChanged = residenceRentAmt !== null;

    const updateObj = {};
    if (residenceAddr1Changed) {
      updateObj.residenceAddr1 = residenceAddr1 || '';
    }
    if (residenceAddr2Changed) {
      updateObj.residenceAddr2 = residenceAddr2 || '';
    }
    if (residenceDistrictChanged) {
      updateObj.residenceDistrict = residenceDistrict || '';
    }
    if (residenceCityChanged) {
      updateObj.residenceCity = residenceCity || '';
    }
    if (residencePostalChanged) {
      updateObj.residencePostal = residencePostal || '';
    }
    if (residenceProvinceChanged) {
      updateObj.residenceProvince = residenceProvince || '';
    }
    if (residenceStatusChanged) {
      updateObj.residenceStatus = residenceStatus || '';
    }
    if (residenceRentAmtChanged) {
      updateObj.residenceRentAmt = numeral(residenceRentAmt).value() || 0;
    }

    const shouldUpdate = Object.keys(updateObj).length > 0;
    if (shouldUpdate) {
      updateUser({ residenceInfo: updateObj });
    } else {
      this.progressStep();
    }
  }

  onSubmitEmploymentInfo() {
    const {
      employmentStatus,
      employmentJobTitle,
      employmentStartMonth,
      employmentStartYear,
      employmentIncome,
      employmentEducation,
    } = this.state;
    const {
      updateUser,
    } = this.props;

    const employmentStatusChanged = employmentStatus !== null;
    const employmentJobTitleChanged = employmentJobTitle !== null;
    const employmentStartMonthChanged = employmentStartMonth !== null;
    const employmentStartYearChanged = employmentStartYear !== null;
    const employmentIncomeChanged = employmentIncome !== null;
    const employmentEducationChanged = employmentEducation !== null;

    const updateObj = {};
    if (employmentStatusChanged) {
      updateObj.employmentStatus = employmentStatus || '';
    }
    if (employmentJobTitleChanged) {
      updateObj.employmentJobTitle = employmentJobTitle || '';
    }
    if (employmentStartMonthChanged) {
      updateObj.employmentStartMonth = parseInt(employmentStartMonth, 10) || 0;
    }
    if (employmentStartYearChanged) {
      updateObj.employmentStartYear = parseInt(employmentStartYear, 10) || 0;
    }
    if (employmentEducationChanged) {
      updateObj.employmentEducation = employmentEducation || '';
    }
    if (employmentIncomeChanged) {
      updateObj.employmentIncome = numeral(employmentIncome).value();
    }

    const shouldUpdate = Object.keys(updateObj).length > 0;
    if (shouldUpdate) {
      updateUser({ employmentInfo: updateObj });
    } else {
      this.progressStep();
    }
  }

  requestLoan() {
    const {
      requestLoan,
    } = this.props;

    const {
      loanAmount,
      loanPurpose,
      loanMemo,
      termsAgreed,
    } = this.state;

    requestLoan({ loanAmount, loanPurpose, loanMemo, termsAgreed });
  }

  setStatePropIfNumber(keyValPair) {
    const [[key, val]] = Object.entries(keyValPair);
    if (!val || Number.isFinite(Number(val))) {
      this.setState({ [key]: val });
    }
  }

  render() {
    const {
      classes,
      loans: { loans },
      user: {
        signupLoading,
        signupError,
        updatingError,
        user = {},
      },
      activeLoan: {
        requestLoading,
        requestError: requestLoanError,
      },
    } = this.props;

    const {
      accountFirstName,
      accountLastName,
      accountDateOfBirth,
      accountPhoneNumber,
      accountEmail,
      accountPassword,
      accountConfirmPassword,
      employmentStatus,
      employmentJobTitle,
      employmentStartMonth,
      employmentStartYear,
      employmentIncome,
      employmentEducation,
      residenceAddr1,
      residenceAddr2,
      residenceDistrict,
      residenceCity,
      residencePostal,
      residenceProvince,
      residenceStatus,
      residenceRentAmt,
      loanAmount,
      loanMemo,
      loanPurpose,
      percent,
      termsAgreed,
    } = this.state;

    const {
      firstName: userFirstName,
      lastName: userLastName,
      dateOfBirth: userDateOfBirth,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      employmentInfo: userEmploymentInfo = {},
      residenceInfo: userResidenceInfo = {},
    } = user;

    const {
      residenceAddr1: userAddr1,
      residenceAddr2: userAddr2,
      residenceCity: userCity,
      residenceDistrict: userDistrict,
      residencePostal: userPostal,
      residenceProvince: userProvince,
      residenceRentAmt: userRentAmt,
      residenceStatus: userResidenceStatus,
    } = userResidenceInfo;

    const {
      employmentStatus: userEmploymentStatus,
      employmentJobTitle: userEmploymentJobTitle,
      employmentStartMonth: userEmploymentStartMonth,
      employmentStartYear: userEmploymentStartYear,
      employmentIncome: userEmploymentIncome,
      employmentEducation: userEmploymentEducation,
    } = userEmploymentInfo;

    if (percent === 0) {
      const repaidLoans = loans.reduce((numRepaid, loan) => (loan.state === LOAN_STATES.REPAID ? numRepaid + 1 : numRepaid), 0);
      const maxLoanAmount = user.qinBalance > 0 || repaidLoans > 0 ? 3000 : 2000;
      return (
        <div>
          <IntroModal />
          <BorrowerLanding
            loanAmount={ loanAmount }
            minLoanAmount={ MIN_LOAN_AMOUNT }
            maxLoanAmount={ maxLoanAmount }
            onLoanAmountChange={ value => this.setState({ loanAmount: value }) }
            onGetLoanClick={ this.progressStep }
          />
        </div>
      );
    }

    const progress = (
      <div className={ classes.progress }>
        <div className={ classes.progressBarContainer }>
          <Line
            percent={ percent }
            trailColor="#EDEDED"
            strokeColor="#004870"
            trailWidth={ 4 }
            strokeWidth={ 4 }
          />
        </div>
        <div className={ classes.percent }>
          { numeral(percent).format('0,0') }% Completed
        </div>
      </div>
    );

    let content;
    if (percent === 20) {
      content = (
        <LoanInfoFormCard
          loanMemo={ loanMemo }
          loanPurpose={ loanPurpose }
          loanPurposeOptions={ purposeOptions }
          onNext={ this.progressStep }
          onGoBack={ this.backOneStep }
          onMemoChange={ this.memoChange }
          onPurposeChange={ value => this.setState({ loanPurpose: value }) }
        />
      );
    } else if (percent === 40) {
      content = (
        <CreateAccountFormCard
          firstName={ userFirstName || accountFirstName }
          lastName={ userLastName || accountLastName }
          email={ userEmail || accountEmail }
          dateOfBirth={ userDateOfBirth || accountDateOfBirth }
          phoneNumber={ userPhoneNumber || accountPhoneNumber }
          password={ accountPassword }
          confirmPassword={ accountConfirmPassword }
          signupError={ signupError }
          signupLoading={ signupLoading }
          userIsLoggedIn={ exists(user.uid) }
          onFirstNameChange={ value => this.setState({ accountFirstName: value }) }
          onLastNameChange={ value => this.setState({ accountLastName: value }) }
          onDateOfBirthChange={ value => this.setState({ accountDateOfBirth: value }) }
          onPhoneNumberChange={ value => this.setState({ accountPhoneNumber: value }) }
          onEmailChange={ value => this.setState({ accountEmail: value }) }
          onPasswordChange={ value => this.setState({ accountPassword: value }) }
          onConfirmPasswordChange={ value => this.setState({ accountConfirmPassword: value }) }
          onGoBack={ this.backOneStep }
          onCreateAccount={ this.onCreateAccount }
        />
      );
    } else if (percent === 60) {
      const firebaseUser = firebaseAuth.getCurrentUser();
      const emailIsVerified = firebaseUser !== null && firebaseUser.emailVerified;

      const confirmEmail = !emailIsVerified && (
        <div className={ classes.confirmEmailContainer }>
          <ConfirmEmail
            firstName={ user.firstName }
            email={ user.email }
            isInitiallyVisible
          />
        </div>
      );

      content = (
        <div>
          { confirmEmail }
          <ResidenceFormCard
            addr1={ residenceAddr1 !== null ? residenceAddr1 : userAddr1 }
            addr2={ residenceAddr2 !== null ? residenceAddr2 : userAddr2 }
            district={ residenceDistrict !== null ? residenceDistrict : userDistrict }
            city={ residenceCity !== null ? residenceCity : userCity }
            postal={ residencePostal !== null ? residencePostal : userPostal }
            province={ residenceProvince !== null ? residenceProvince : userProvince }
            status={ residenceStatus !== null ? residenceStatus : userResidenceStatus }
            rentAmt={ residenceRentAmt !== null ? residenceRentAmt : `${userRentAmt || ''}` }
            error={ updatingError }
            onAddr1Change={ value => this.setState({ residenceAddr1: value }) }
            onAddr2Change={ value => this.setState({ residenceAddr2: value }) }
            onDistrictChange={ value => this.setState({ residenceDistrict: value }) }
            onCityChange={ value => this.setState({ residenceCity: value }) }
            onPostalChange={ value => this.setState({ residencePostal: value }) }
            onProvinceChange={ value => this.setState({ residenceProvince: value }) }
            onStatusChange={ value => this.setState({ residenceStatus: value }) }
            onRentAmtChange={ value => this.setStatePropIfNumber({ residenceRentAmt: value }) }
            onGoBack={ this.backOneStep }
            onNext={ this.onSubmitResidenceInfo }
          />
        </div>
      );
    } else if (percent === 80) {
      content = (
        <EmploymentFormCard
          statusOptions={ employmentOptions }
          monthOptions={ monthOptions }
          yearOptions={ yearOptions }
          educationOptions={ educationOptions }
          status={ employmentStatus !== null ? employmentStatus : userEmploymentStatus }
          jobTitle={ employmentJobTitle !== null ? employmentJobTitle : userEmploymentJobTitle }
          startMonth={ employmentStartMonth !== null ? employmentStartMonth : userEmploymentStartMonth }
          startYear={ employmentStartYear !== null ? employmentStartYear : userEmploymentStartYear }
          income={ employmentIncome !== null ? `${employmentIncome || ''}` : userEmploymentIncome }
          education={ employmentEducation !== null ? employmentEducation : userEmploymentEducation }
          error={ updatingError }
          onStatusChange={ value => this.setState({ employmentStatus: value }) }
          onJobTitleChange={ value => this.setState({ employmentJobTitle: value }) }
          onStartMonthChange={ value => this.setState({ employmentStartMonth: value }) }
          onStartYearChange={ value => this.setState({ employmentStartYear: value }) }
          onIncomeChange={ value => this.setStatePropIfNumber({ employmentIncome: value }) }
          onEducationChange={ value => this.setState({ employmentEducation: value }) }
          onGoBack={ this.backOneStep }
          onNext={ this.onSubmitEmploymentInfo }
        />
      );
    } else if (percent === 100) {
      content = (
        <Review
          accountFirstName={ userFirstName }
          accountLastName={ userLastName }
          accountDateOfBirth={ userDateOfBirth }
          accountPhoneNumber={ userPhoneNumber }
          employmentStatus={ userEmploymentStatus }
          employmentJobTitle={ userEmploymentJobTitle }
          employmentStartMonth={ userEmploymentStartMonth }
          employmentStartYear={ userEmploymentStartYear }
          employmentEducation={ userEmploymentEducation }
          residenceAddr1={ userAddr1 }
          residenceAddr2={ userAddr2 }
          residenceDistrict={ userDistrict }
          residenceCity={ userCity }
          residencePostal={ userPostal }
          residenceProvince={ userProvince }
          residenceStatus={ userResidenceStatus }
          residenceRentAmt={ userRentAmt }
          loanMemo={ loanMemo }
          loanAmount={ loanAmount }
          termsAgreed={ termsAgreed }
          onTermsCheckboxClick={ checked => this.setState({ termsAgreed: checked }) }
          requestError={ requestLoanError }
          loading={ requestLoading }
          onGoBack={ this.backOneStep }
          onSubmit={ this.requestLoan }
        />
      );
    }

    return (
      <div className={ classes.main }>
        <Header />
        <div className={ classes.content }>
          { progress }
          <div className={ classes.centerContainer }>
            { content }
          </div>
        </div>
      </div>
    );
  }
}

GetLoan.propTypes = propTypes;
export default connect(
  ({ activeLoan, loans, user }) => ({ activeLoan, loans, user }),
  dispatch => bindActionCreators({
    loadActiveLoan: loadActiveLoanAction,
    loadLoans: loadLoansAction,
    loadUser: loadUserAction,
    signup: signupAction,
    requestLoan: requestLoanAction,
    updateUser: updateUserAction,
  }, dispatch),
)(injectSheet(styles)(GetLoan));
