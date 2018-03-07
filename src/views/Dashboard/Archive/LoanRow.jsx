import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';
import moment from 'moment';

import iconCollapse from '../../../../assets/img/icon-collapse-up.svg';

const DATE_FORMAT_STRING = 'MMM DD, YYYY';
const DEFAULT_CURRENCY = 'PHP';
const LOAN_STATES = {
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED',
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  loan: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
    memo: PropTypes.string,
    dueDate: PropTypes.number,
    repaidDate: PropTypes.number,
    state: PropTypes.string,
  }).isRequired,
};
const defaultProps = {
};
const styles = {
  main: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  left: {
    textAlign: 'left',
  },
  subname: {
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.54)',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  right: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'right',
  },
  rightInner: {
    marginRight: '20px',
  },
  rightCollapse: {
    transform: 'rotate(90deg)',
  },
};


function formatNumber(num) {
  return numeral(num).format('0,0');
}

function capitalize(str) {
  return str.replace(/^([a-z])/, letter => letter.toUpperCase());
}

class LoanRow extends Component {
  render() {
    const {
      classes,
      loan,
    } = this.props;

    const {
      amount,
      currency,
      memo,
      dueDate,
      repaidDate,
      state,
    } = loan;

    const loanCurrency = currency || DEFAULT_CURRENCY;
    const date = state === LOAN_STATES.REPAID ? repaidDate : dueDate;

    return (
      <div className={ classes.main }>
        <div className={ classes.left }>
          <div className={ classes.name }>{ formatNumber(amount) } { loanCurrency } Personal Loan</div>
          <div className={ classes.subname }>{ memo }</div>
        </div>
        <div className={ classes.right }>
          <div className={ classes.rightInner }>
            <div className={ classes.name }>{ capitalize(state) }</div>
            <div className={ classes.subname }>{ moment(date).format(DATE_FORMAT_STRING) }</div>
          </div>
          <img alt="" src={ iconCollapse } className={ classes.rightCollapse } />
        </div>
      </div>
    );
  }
}

LoanRow.propTypes = propTypes;
LoanRow.defaultProps = defaultProps;
export default injectSheet(styles)(LoanRow);
