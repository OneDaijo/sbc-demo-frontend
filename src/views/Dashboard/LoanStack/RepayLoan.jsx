import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import moment from 'moment';
import numeral from 'numeral';

import Repayment from '../Repayment';
import Card from '../../shared/Card';
import QinCard from '../../shared/QinCard';
import StackCard from '../../shared/Stack/StackCard';
import Button from '../../shared/Button';

import colors from '../../../utils/colors';

import iconPopoutActive from '../../../../assets/img/icon-popout-white.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  isLoanRepaid: PropTypes.bool,
  borrowerName: PropTypes.string,
  disableActions: PropTypes.bool,
  onMakePaymentClick: PropTypes.func,
  onCloseLoanClick: PropTypes.func,
  loanCurrency: PropTypes.string,
  loanRepaidTs: PropTypes.number,
  loanDueDate: PropTypes.number,
  loanQinReward: PropTypes.number,
  loanAmountPaid: PropTypes.number,
  loanAmountOwed: PropTypes.number,
  mostRecentPayment: PropTypes.object,
};

const defaultProps = {
  isLoanRepaid: false,
  borrowerName: '',
  loanCurrency: 'PHP',
  loanRepaidTs: 0,
  loanDueDate: 0,
  loanQinReward: 0,
  loanAmountPaid: 0,
  loanAmountOwed: 0,
  mostRecentPayment: {},
  onMakePaymentClick: () => {},
  onCloseLoanClick: () => {},
};

const styles = {
  paddedContent: {
    width: '100%',
    padding: '10px 40px 40px',
  },
  columnContent: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: '18px',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  centeredText: {
    textAlign: 'center',
  },
  leftAlignText: {
    textAlign: 'left',
  },
  qinCard: {
    marginTop: '33px',
    display: 'inline-block',
  },
  qinLink: {
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'underline',
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer',
    marginTop: '30px',
  },
  body: {
    marginTop: '25px',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  cardBottom: {
    marginTop: ({ isLoanRepaid }) => (isLoanRepaid ? '94px' : '76px'),
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  repaymentCard: {
    position: 'relative',
    width: '500px',
    marginTop: '30px',
    marginRight: 'auto',
    marginLeft: 'auto',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
  },
  repaymentCardInner: {
    padding: '40px',
  },
  repaymentCardDivider: {
    backgroundColor: '#f0f0f0',
    height: '1px',
    width: '100%',
  },
  button: {
    paddingTop: '14px',
    paddingRight: '33px',
    paddingBottom: '15px',
    paddingLeft: '38px',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: '500',
    color: ({ isLoanRepaid }) => (!isLoanRepaid ? colors.WHITE : colors.GRAY_DARK),
  },
  buttonIcon: {
    marginLeft: '5px',
  },
  recentActivityTitle: {
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  activity: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '23px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
};

function formatNumber(qin) {
  return numeral(qin).format('0,0.00');
}

function humanReadableDate(millis) {
  return moment(millis).format('MMM DD, YYYY');
}

class RepayLoan extends PureComponent {
  render() {
    const {
      classes,
      isLoanRepaid,
      borrowerName,
      disableActions,
      onMakePaymentClick,
      onCloseLoanClick,
      mostRecentPayment,
      loanCurrency,
      loanRepaidTs,
      loanDueDate,
      loanQinReward,
      loanAmountOwed,
      loanAmountPaid,
      ...rest
    } = this.props;

    let button;
    let content;

    if (isLoanRepaid) {
      const { amount: repaymentAmount, ts: repaymentTs } = mostRecentPayment;
      const paymentText = `${formatNumber(repaymentAmount)} ${loanCurrency} payment on ${humanReadableDate(repaymentTs)}`;

      button = !disableActions && (
        <Button
          active
          buttonClassName={ classes.button }
          onClick={ onCloseLoanClick }
        >
          Close Loan
        </Button>
      );

      content = (
        <div className={ classes.centeredText }>
          <div className={ classes.status }>Congratulations on successfully repaying your first loan on time, { borrowerName }!</div>
          <QinCard
            cardClassName={ classes.qinCard }
            qinAmount={ loanQinReward }
          />
          <div className={ classes.body }>
            You earned { formatNumber(loanQinReward) } QIN tokens for fully repaying your loan on time.&nbsp;
            Next time you apply for a loan, you’ll be able to request more money.
          </div>
          <NavLink to="/dashboard/qin" className={ classes.qinLink }>Go to QIN Management</NavLink>
          <Card cardClassName={ classes.repaymentCard }>
            <div className={ classes.repaymentCardInner }>
              <Repayment
                amtOwed={ loanAmountOwed }
                amtPaid={ loanAmountOwed }
                qinReward={ loanQinReward }
                currency="PHP"
              />
            </div>
            <div className={ classes.repaymentCardDivider } />
            <div className={ classes.repaymentCardInner }>
              <div className={ classes.leftAlignText }>
                <div className={ classes.recentActivityTitle }>Recent Activity</div>
                <div className={ classes.activity }>{ paymentText }</div>
              </div>
            </div>
          </Card>
        </div>
      );
    } else {
      const formattedDate = humanReadableDate(loanDueDate);

      button = (
        <Button
          buttonClassName={ classes.button }
          active={ !isLoanRepaid }
          onClick={ onMakePaymentClick }
        >
          <div className={ classes.buttonText }>Make a payment</div>
          <img
            alt=""
            src={ iconPopoutActive }
            className={ classes.buttonIcon }
          />
        </Button>
      );

      content = (
        <div className={ classes.columnContent }>
          <div className={ classes.status }>Payment is due { formattedDate }.</div>
          <div className={ classes.body }>
            Repay on time to earn QIN rewards! Earning more QIN tokens allows you to borrow more money in the future.
          </div>
          <Card cardClassName={ classes.repaymentCard }>
            <div className={ classes.repaymentCardInner }>
              <Repayment
                amtOwed={ loanAmountOwed }
                amtPaid={ loanAmountPaid }
                qinReward={ loanQinReward }
                currency="PHP"
              />
            </div>
          </Card>
        </div>
      );
    }

    const cardBottomContent = (
      <div className={ classes.cardBottom }>
        { button }
      </div>
    );

    return (
      <StackCard
        title="Repay Loan"
        isCompleted={ isLoanRepaid }
        { ...rest }
      >
        <div className={ classes.paddedContent }>
          { content }
          { cardBottomContent }
        </div>
      </StackCard>
    );
  }
}

RepayLoan.propTypes = propTypes;
RepayLoan.defaultProps = defaultProps;
export default injectSheet(styles)(RepayLoan);
