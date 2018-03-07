import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';

import LoanInfo from './LoanInfo';
import colors from '../../../utils/colors';
import RepaymentProgressBar from './RepaymentProgressBar';


const propTypes = {
  classes: PropTypes.object.isRequired,
  currency: PropTypes.string,
  amtOwed: PropTypes.number,
  amtPaid: PropTypes.number,
  qinReward: PropTypes.number,
};

const defaultProps = {
  currency: 'PHP',
  amtOwed: 0,
  amtPaid: 0,
  qinReward: 0,
};


const styles = {
  main: {
    width: '100%',
  },
  top: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  topText: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
  bottom: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  paid: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  owed: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-end',
  },
  paidText: {
    fontSize: '8px',
    fontWeight: '500',
    color: colors.GRAY_LIGHT,
  },
  owedText: {
    fontSize: '8px',
    fontWeight: '500',
    color: colors.GRAY_LIGHT,
  },
  paidAmt: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: colors.GRAY_LIGHT,
  },
  owedAmt: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: colors.GRAY_LIGHT,
  },
};


function formatNumber(value) {
  return numeral(value).format('0,0.00');
}

function formatQin(value) {
  return numeral(value).format('0,0.00');
}

class RepaymentProgress extends PureComponent {
  render() {
    const {
      classes,
      currency,
      amtOwed,
      amtPaid,
      qinReward,
    } = this.props;

    const percentPaidBack = Math.min(100, (amtPaid / amtOwed) * 100) || 0;

    const topSection = (
      <div className={ classes.top }>
        <div className={ classes.topText }>
          Repayment Progress
        </div>
        <div className={ classes.topText }>
          <LoanInfo
            align="right"
            title="REWARD"
            value={ `${formatQin(qinReward)} QIN` }
          />
        </div>
      </div>
    );

    const paidSection = (
      <LoanInfo
        align="left"
        title="PAID"
        value={ `${formatNumber(amtPaid)} ${currency}` }
      />
    );

    const owedSection = (
      <LoanInfo
        align="right"
        title="OWED"
        value={ `${formatNumber(amtOwed)} ${currency}` }
      />
    );

    const bottomSection = (
      <div className={ classes.bottom }>
        { paidSection }
        { owedSection }
      </div>
    );

    return (
      <div className={ classes.main }>
        { topSection }
        <RepaymentProgressBar
          percent={ percentPaidBack }
        />
        { bottomSection }
      </div>
    );
  }
}

RepaymentProgress.propTypes = propTypes;
RepaymentProgress.defaultProps = defaultProps;
export default injectSheet(styles)(RepaymentProgress);
