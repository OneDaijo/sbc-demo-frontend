import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Apply from './Apply';
import GetFunds from './GetFunds';
import Terms from './Terms';
import RepayLoan from './RepayLoan';
import Stack from '../../shared/Stack';

const propTypes = {
  borrowerName: PropTypes.string.isRequired,
  loan: PropTypes.object.isRequired,
  disableActions: PropTypes.bool,
  onSelectTermsClick: PropTypes.func,
  onChooseFundingClick: PropTypes.func,
  onMakePaymentClick: PropTypes.func,
  onCancelLoanClick: PropTypes.func,
  onCloseLoanClick: PropTypes.func,
};

const defaultProps = {
  disableActions: false,
  onSelectTermsClick: () => {},
  onChooseFundingClick: () => {},
  onMakePaymentClick: () => {},
  onCancelLoanClick: () => {},
  onCloseLoanClick: () => {},
};

const LOAN_STATES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ACCEPTED: 'ACCEPTED',
  READY: 'READY_FOR_PICKUP',
  SENT: 'SENT',
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED',
};

const exists = val => val !== null && val !== undefined;
class LoanStack extends Component {
  constructor(props) {
    super();
    const loanState = props.loan.state;

    this.state = {
      applyExpanded: loanState === LOAN_STATES.PENDING,
      termsExpanded: loanState === LOAN_STATES.APPROVED,
      getFundsExpanded: loanState === LOAN_STATES.ACCEPTED,
      repayLoanExpanded: loanState === LOAN_STATES.READY
        || loanState === LOAN_STATES.SENT
        || loanState === LOAN_STATES.REPAID
        || loanState === LOAN_STATES.DEFAULTED,
    };

    const createSetExpandedFunc = key => expanded => this.setState({ [key]: expanded });
    this.setApplyExpanded = createSetExpandedFunc('applyExpanded').bind(this);
    this.setTermsExpanded = createSetExpandedFunc('termsExpanded').bind(this);
    this.setGetFundsExpanded = createSetExpandedFunc('getFundsExpanded').bind(this);
    this.setRepayLoanExpanded = createSetExpandedFunc('repayLoanExpanded').bind(this);
  }

  render() {
    const {
      borrowerName,
      loan,
      disableActions,
      onSelectTermsClick,
      onChooseFundingClick,
      onMakePaymentClick,
      onCancelLoanClick,
      onCloseLoanClick,
    } = this.props;

    const {
      applyExpanded,
      getFundsExpanded,
      repayLoanExpanded,
      termsExpanded,
    } = this.state;

    const {
      loanTerms = [],
      dueDate: loanDueDate,
      repaidDate: loanRepaidTs,
      state: loanState,
      amountPaid: loanAmountPaid,
      pickupLocation: loanPickupLocation = {},
      acceptedTerms: acceptedLoanTerms = {},
      repayments: loanRepayments = [],
    } = loan;

    const {
      amountOwed: loanAmountOwed,
      qinReward: loanQinReward,
    } = acceptedLoanTerms;

    // for demo only, needs to wait til money is ready in prod
    const pickupLocationChosen = exists(loanPickupLocation.locationName);

    const termsChosen = exists(acceptedLoanTerms && acceptedLoanTerms.id);

    const applyComplete = loanTerms.length > 0;
    const termsComplete = applyComplete && termsChosen;
    const getFundsComplete = termsComplete && pickupLocationChosen;
    const repaymentComplete = loanState === LOAN_STATES.REPAID;

    if (!loan.id) {
      return null;
    }

    return (
      <Stack
        id="LoanStatusStack"
      >
        <Apply
          isExpanded={ applyExpanded }
          isCompleted={ applyComplete }
          onToggleExpanded={ () => this.setApplyExpanded(!applyExpanded) }
          onClick={ () => {
            this.setApplyExpanded(false);
            this.setTermsExpanded(true);
          } }
        />
        <Terms
          isExpanded={ termsExpanded }
          isCompleted={ termsComplete }
          loanTerms={ loanTerms }
          selectedTerms={ acceptedLoanTerms }
          onToggleExpanded={ () => applyComplete && this.setTermsExpanded(!termsExpanded) }
          onCancelLoanClick={ onCancelLoanClick }
          onSelectTermsClick={ onSelectTermsClick }
          onContinueClick={ () => {
            this.setTermsExpanded(false);
            this.setGetFundsExpanded(true);
          } }
        />
        <GetFunds
          isExpanded={ getFundsExpanded }
          isReadyForPickup={ getFundsComplete }
          loanPickupLocation={ loanPickupLocation }
          onToggleExpanded={ () => termsComplete && this.setGetFundsExpanded(!getFundsExpanded) }
          onChooseFundingClick={ onChooseFundingClick }
          onContinueClick={ () => {
            this.setGetFundsExpanded(false);
            this.setRepayLoanExpanded(true);
          } }
          borrowerName={ borrowerName }
          fundsOptionsReady
        />
        <RepayLoan
          borrowerName={ borrowerName }
          isExpanded={ repayLoanExpanded }
          isLoanRepaid={ repaymentComplete }
          onToggleExpanded={ () => getFundsComplete && this.setRepayLoanExpanded(!repayLoanExpanded) }
          onMakePaymentClick={ onMakePaymentClick }
          onCloseLoanClick={ onCloseLoanClick }
          mostRecentPayment={ loanRepayments[loanRepayments.length - 1] }
          loanRepaidTs={ loanRepaidTs }
          loanDueDate={ loanDueDate }
          loanAmountOwed={ loanAmountOwed }
          loanAmountPaid={ loanAmountPaid }
          loanQinReward={ loanQinReward }
          disableActions={ disableActions }
        />
      </Stack>
    );
  }
}

LoanStack.propTypes = propTypes;
LoanStack.defaultProps = defaultProps;
export default LoanStack;
