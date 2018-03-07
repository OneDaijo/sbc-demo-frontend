import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';
import moment from 'moment';

import Card from '../../shared/Card';

import colors from '../../../utils/colors';


const propTypes = {
  classes: PropTypes.object.isRequired,
  loans: PropTypes.arrayOf(PropTypes.object),
  activeLoan: PropTypes.object,
  userCreated: PropTypes.number,
};

const defaultProps = {
  loans: [],
  activeLoan: {},
  userCreated: 0,
};

const styles = {
  cardTable: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: 'rgba(0, 42, 66, 0.5)',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1px solid ${colors.GRAY_XXLIGHT}`,
    padding: '15px 40px',
  },
  lastRow: {
    extend: 'row',
    borderBottom: `1px solid ${colors.GRAY_XXLIGHT}`,
  },
  headerRow: {
    extend: 'row',
    padding: '10px 40px',
  },
  footerRow: {
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '14px 0px',
  },
  tableCell: {
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '22px',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
    marginLeft: '40px',
  },
  safeLengthCell: {
    extend: 'tableCell',
    width: '120px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  dateCell: {
    extend: 'tableCell',
    width: '100px',
    marginLeft: '0px',
  },
  headerDateCell: {
    extend: 'dateCell',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: 'rgba(0, 42, 66, 0.5)',
  },
  transactionCell: {
    extend: 'safeLengthCell',
    width: '120px',
  },
  headerTransactionCell: {
    extend: 'transactionCell',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: 'rgba(0, 42, 66, 0.5)',
  },
  loanCell: {
    extend: 'safeLengthCell',
    width: '220px',
  },
  headerLoanCell: {
    extend: 'loanCell',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: 'rgba(0, 42, 66, 0.5)',
  },
  qinCell: {
    extend: 'safeLengthCell',
    width: '120px',
  },
  headerQinCell: {
    extend: 'qinCell',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '20px',
    color: 'rgba(0, 42, 66, 0.5)',
  },
  memo: {
    fontSize: '12px',
    color: 'rgba(0, 0, 0, 0.38)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const DEFAULT_CURRENCY = 'PHP';
const LOAN_STATES = {
  CANCELED: 'CANCELED',
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED',
};

function formatNumber(val) {
  return numeral(val).format('0,0');
}

function formatQin(qin) {
  return numeral(qin).format('0,0.00');
}

function formatDate(millis) {
  return moment(millis).format('MMM DD, YYYY');
}

function renderLoans(loans, classes) {
  const numLoans = loans.length;
  return loans.map((loan, index) => {
    const {
      id,
      amount,
      memo,
      repaidDate,
      state,
      acceptedTerms = {},
      currency = DEFAULT_CURRENCY,
    } = loan;

    const {
      qinReward,
      qinRequired,
    } = acceptedTerms;

    const rowClassName = index === numLoans - 1 ? classes.lastRow : classes.row;
    let transactionType;
    let qinAmount;
    if (state === LOAN_STATES.REPAID) {
      transactionType = 'Made Payment';
      qinAmount = qinReward;
    } else if (state === LOAN_STATES.CANCELED) {
      transactionType = 'Canceled';
      qinAmount = 0;
    } else if (state === LOAN_STATES.DEFAULTED) {
      transactionType = 'Defaulted';
      qinAmount = -qinRequired;
    }

    return (
      <div key={ id } className={ rowClassName }>
        <div className={ classes.dateCell }>{ formatDate(repaidDate) }</div>
        <div className={ classes.transactionCell }>{ transactionType }</div>
        <div className={ classes.loanCell }>
          <div className={ classes.amount }>{ formatNumber(amount) } { currency } Personal Loan</div>
          <div className={ classes.memo }>{ memo }</div>
        </div>
        <div className={ classes.qinCell }>{ qinAmount > 0 ? '+' : '' }{ formatQin(qinAmount) }</div>
      </div>
    );
  });
}

class QinHistory extends Component {
  render() {
    const {
      classes,
      activeLoan,
      loans,
      userCreated,
    } = this.props;

    const activeLoanId = activeLoan.id;
    const activeLoanInactive = activeLoan.state === 'REPAID' || activeLoan.state === 'DEFAULTED' || activeLoan.state === 'EXPIRED';
    const sortedLoans = [...loans].sort((a, b) => b.created - a.created).filter(loan => loan.id !== activeLoanId || activeLoanInactive);
    const loanRows = renderLoans(sortedLoans, classes);
    const isActiveLoanActive = activeLoan.state !== 'REPAID' && activeLoan.state !== 'DEFAULTED';
    const qinRequired = (activeLoan.acceptedTerms && activeLoan.acceptedTerms.qinRequired) || 0;
    if (isActiveLoanActive && qinRequired > 0) {
      const {
        id,
        amount,
        memo,
        currency = DEFAULT_CURRENCY,
        created: loanCreatedTs,
      } = activeLoan;

      const qinCollateralRow = (
        <div key={ `${id}:Collateral` } className={ classes.row }>
          <div className={ classes.dateCell }>{ formatDate(loanCreatedTs) }</div>
          <div className={ classes.transactionCell }>Loan Collateral</div>
          <div className={ classes.loanCell }>
            <div className={ classes.amount }>{ formatNumber(amount) } { currency } Personal Loan</div>
            <div className={ classes.memo }>{ memo }</div>
          </div>
          <div className={ classes.qinCell }>{ qinRequired > 0 ? '-' : '' }{ formatQin(qinRequired) }</div>
        </div>
      );

      loanRows.unshift(qinCollateralRow);
    }

    const footerRow = userCreated > 0 && (
      <div className={ classes.footerRow }>
        You joined OneDaijo on { formatDate(userCreated) } 🎂
      </div>
    );

    return (
      <Card cardClassName={ classes.cardTable }>
        <div className={ classes.headerRow }>
          <div className={ classes.headerDateCell }>DATE</div>
          <div className={ classes.headerTransactionCell }>TRANSACTION</div>
          <div className={ classes.headerLoanCell }>LOAN</div>
          <div className={ classes.headerQinCell }>REWARD</div>
        </div>
        { loanRows }
        { footerRow }
      </Card>
    );
  }
}

QinHistory.propTypes = propTypes;
QinHistory.defaultProps = defaultProps;
export default injectSheet(styles)(QinHistory);
