import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import IntroducingQinModal from './IntroducingQinModal';
import TermsModal from './TermsModal';
import CollectMoneyModal from './CollectMoneyModal';
import MakePaymentModal from './MakePaymentModal';
import SuccessModal from './SuccessModal';
import NoLoans from './NoLoans';

import FirstTimeLanding from './FirstTimeLanding';
import Header from '../Header';
import LoanStack from '../LoanStack';

import {
  loadActiveLoan as loadActiveLoanAction,
  cancelActiveLoan as cancelActiveLoanAction,
  choosePickupLocation as choosePickupLocationAction,
  selectLoanTerm as selectLoanTermAction,
  repayLoan as repayLoanAction,
  closeLoan as closeLoanAction,
} from '../../../actions/activeLoan';

import {
  loadUser as loadUserAction,
} from '../../../actions/user';

import {
  loadLoans as loadLoansAction,
} from '../../../actions/loans';

import colors from '../../../utils/colors';

const propTypes = {
  activeLoan: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loans: PropTypes.object.isRequired,
  loadActiveLoan: PropTypes.func.isRequired,
  loadLoans: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  selectLoanTerm: PropTypes.func.isRequired,
  cancelActiveLoan: PropTypes.func.isRequired,
  choosePickupLocation: PropTypes.func.isRequired,
  repayLoan: PropTypes.func.isRequired,
  closeLoan: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const defaultProps = {};

const styles = {
  main: {
    height: 'auto',
    minHeight: '100vh',
    backgroundColor: '#FAFCFC',
  },
  pageContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '69px',
    paddingBottom: '125px',
  },
  loanSummary: {
    marginTop: '76px',
  },
  loanAmount: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    color: colors.BLACK,
    textAlign: 'center',
  },
  loanMemo: {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '26px',
    color: colors.GRAY_DARK,
    textAlign: 'center',
  },
  loanStackContainer: {
    marginTop: '30px',
  },
};

const LOAN_STATES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ACCEPTED: 'ACCEPTED',
  READY: 'READY_FOR_PICKUP',
  OUTSTANDING: 'OUTSTANDING',
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED',
};

const exists = val => val !== null && val !== undefined;

class Loans extends Component {
  constructor() {
    super();
    this.state = {
      showTermsModal: false,
      showQinModal: false,
      showCollectModal: false,
      showMakePaymentModal: false,
    };

    this.showTermsModal = this.showTermsModal.bind(this);
    this.hideTermsModal = this.hideTermsModal.bind(this);
    this.showQinModal = this.showQinModal.bind(this);
    this.hideQinModal = this.hideQinModal.bind(this);
    this.showCollectModal = this.showCollectModal.bind(this);
    this.hideCollectModal = this.hideCollectModal.bind(this);
    this.showMakePaymentModal = this.showMakePaymentModal.bind(this);
    this.hideMakePaymentModal = this.hideMakePaymentModal.bind(this);
    this.showSuccessModal = this.showSuccessModal.bind(this);
    this.hideSuccessModal = this.hideSuccessModal.bind(this);
    this.cancelLoan = this.cancelLoan.bind(this);
    this.restartDemo = this.restartDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      activeLoan,
      loadLoans,
      loadUser,
    } = this.props;

    const {
      loan: {
        state: currLoanState,
        pickupLocation: currPickupLocation = {},
        acceptedTerms: currAcceptedTerms,
      },
    } = activeLoan;

    const {
      loan: {
        state: nextLoanState,
        pickupLocation: nextPickupLocation = {},
        acceptedTerms: nextAcceptedTerms,
      },
    } = nextProps.activeLoan;

    // Handle location selected
    if (!exists(currPickupLocation.locationName) && exists(nextPickupLocation.locationName)) {
      this.hideCollectModal();
    }

    // Handle terms accepted
    if (!exists(currAcceptedTerms && currAcceptedTerms.id) && exists(nextAcceptedTerms && nextAcceptedTerms.id)) {
      this.hideTermsModal();
    }

    // Handle loan repaid TODO: only for demo
    if (currLoanState !== LOAN_STATES.REPAID && nextLoanState === LOAN_STATES.REPAID) {
      loadLoans();
      loadUser();
      this.hideMakePaymentModal();

      // delay to allow for user to see repayment guage fill then show success modal
      setTimeout(() => {
        this.showSuccessModal();
      }, 3000);
    }
  }

  showSuccessModal() {
    this.setState({ showSuccessModal: true });
  }

  hideSuccessModal() {
    this.setState({ showSuccessModal: false });
  }

  showTermsModal() {
    this.setState({ showTermsModal: true, showQinModal: false });
  }

  hideTermsModal() {
    this.setState({ showTermsModal: false });
  }

  showQinModal() {
    this.setState({ showQinModal: true });
  }

  hideQinModal() {
    this.setState({ showQinModal: false });
  }

  showCollectModal() {
    this.setState({ showCollectModal: true });
  }

  hideCollectModal() {
    this.setState({ showCollectModal: false });
  }

  showMakePaymentModal() {
    this.setState({ showMakePaymentModal: true });
  }

  hideMakePaymentModal() {
    this.setState({ showMakePaymentModal: false });
  }

  cancelLoan() {
    const { cancelActiveLoan } = this.props;

    const confirmCancel = typeof window === 'object' && window.confirm('Are you sure you would like to cancel your loan?');
    if (confirmCancel) {
      cancelActiveLoan();
    }
  }

  restartDemo() {
    const { closeLoan } = this.props;
    closeLoan();
    this.hideSuccessModal();
  }

  render() {
    const {
      classes,
      selectLoanTerm,
      choosePickupLocation,
      repayLoan,
      closeLoan,
      loans: { loans },
      user: { user },
      activeLoan: { loan: activeLoan },
    } = this.props;

    const {
      showTermsModal,
      showQinModal,
      showCollectModal,
      showMakePaymentModal,
      showSuccessModal,
    } = this.state;

    const {
      amount: loanAmount,
      memo: loanMemo,
      acceptedTerms: loanAcceptedTerms = {},
    } = activeLoan;
    const loanExists = activeLoan && activeLoan.id;

    const borrowerName = user.firstName || '';
    let pageContent;
    if (loanExists) {
      const termsModal = (
        <TermsModal
          show={ showTermsModal }
          terms={ activeLoan && activeLoan.loanTerms }
          onCloseClick={ this.hideTermsModal }
          onConfirmClick={ selectLoanTerm }
        />
      );

      const introQinModal = (
        <IntroducingQinModal
          show={ showQinModal }
          onCloseClick={ this.hideQinModal }
          onConfirmClick={ this.showTermsModal }
        />
      );

      const collectMoneyModal = (
        <CollectMoneyModal
          show={ showCollectModal }
          onConfirmClick={ choosePickupLocation }
          onCloseClick={ this.hideCollectModal }
        />
      );

      const makePaymentModal = (
        <MakePaymentModal
          show={ showMakePaymentModal }
          onCloseClick={ this.hideMakePaymentModal }
          onConfirmClick={ repayLoan }
          loanId={ activeLoan.id }
        />
      );

      const qinReward = loanAcceptedTerms.qinReward;
      const successModal = (
        <SuccessModal
          isDemoEnd={ loans.length > 1 }
          qinReward={ qinReward }
          show={ showSuccessModal }
          onRestartDemo={ this.restartDemo }
          onHide={ this.hideSuccessModal }
        />
      );

      const loanStack = loanExists
        ? (
          <LoanStack
            loan={ activeLoan }
            borrowerName={ borrowerName }
            onSelectTermsClick={ this.showQinModal }
            onChooseFundingClick={ this.showCollectModal }
            onMakePaymentClick={ this.showMakePaymentModal }
            onCancelLoanClick={ this.cancelLoan }
            onCloseLoanClick={ closeLoan }
          />
        )
        : null;

      const firstTimeLanding = loans.length === 0 && (
        <FirstTimeLanding borrowerName={ borrowerName } />
      );

      pageContent = (
        <div className={ classes.pageContent }>
          { introQinModal }
          { termsModal }
          { collectMoneyModal }
          { makePaymentModal }
          { successModal }
          { firstTimeLanding }
          <div className={ classes.loanSummary }>
            <div className={ classes.loanAmount }>
              { numeral(loanAmount).format('0,0') } PHP Personal Loan
            </div>
            <div className={ classes.loanMemo }>
              { loanMemo }
            </div>
            <div className={ classes.loanStackContainer }>
              { loanStack }
            </div>
          </div>
        </div>
      );
    } else {
      pageContent = (
        <div className={ classes.pageContent }>
          <NoLoans borrowerName={ borrowerName } />
        </div>
      );
    }

    return (
      <div className={ classes.main }>
        <Header />
        { pageContent }
      </div>
    );
  }
}

Loans.propTypes = propTypes;
Loans.defaultProps = defaultProps;
export default connect(
  ({ activeLoan, loans, user }) => ({ activeLoan, loans, user }),
  dispatch => bindActionCreators({
    loadUser: loadUserAction,
    loadLoans: loadLoansAction,
    loadActiveLoan: loadActiveLoanAction,
    cancelActiveLoan: cancelActiveLoanAction,
    choosePickupLocation: choosePickupLocationAction,
    selectLoanTerm: selectLoanTermAction,
    repayLoan: repayLoanAction,
    closeLoan: closeLoanAction,
  }, dispatch),
)(injectSheet(styles)(Loans));
