import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';

import LabeledField from './LabeledField';

const propTypes = {
  classes: PropTypes.object.isRequired,
  loanAmount: PropTypes.number,
  loanMemo: PropTypes.string,
};

const defaultProps = {
  loanAmount: 0,
  loanMemo: '',
};

const styles = {
  main: {
    width: '100%',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '30px',
    color: '#000000',
  },
  flexContent: {
    marginTop: '10px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    marginTop: '5px',
  },
};


function formatNumber(val) {
  return numeral(val).format('0,0');
}

class LoanDetails extends Component {
  render() {
    const {
      classes,
      loanAmount,
      loanMemo,
    } = this.props;

    return (
      <div className={ classes.main }>
        <div className={ classes.title }>Loan Details</div>
        <div className={ classes.flexContent }>
          <LabeledField
            label="Amount requested"
          >
            { formatNumber(loanAmount) } PHP
          </LabeledField>
          <LabeledField
            className={ classes.item }
            label="Memo"
          >
            { loanMemo }
          </LabeledField>
        </div>
      </div>
    );
  }
}

LoanDetails.propTypes = propTypes;
LoanDetails.defaultProps = defaultProps;
export default injectSheet(styles)(LoanDetails);
