import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import numeral from 'numeral';

import Card from '../Card';
import Tooltip from '../ToolTip';
import CloseIcon from '../CloseIcon';
import colors from '../../../utils/colors';
import helpIcon from '../../../../assets/img/icon-question-mark.svg';

const propTypes = {
  cardClassName: PropTypes.string,
  classes: PropTypes.object.isRequired,
  interestRate: PropTypes.number,
  loanType: PropTypes.oneOf(['', 'highestReward', 'lowestInterest']),
  offeredBy: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
  qinReward: PropTypes.number,
  qinRequired: PropTypes.number,
  repaymentAmt: PropTypes.number.isRequired,
  repaymentDays: PropTypes.number,
  repaymentCurrency: PropTypes.string,
};

const defaultProps = {
  cardClassName: '',
  interestRate: 0,
  onCardClick: () => {},
  qinReward: 0,
  qinRequired: 0,
  repaymentCurrency: 'PHP',
  repaymentDays: 30,
  loanType: '',
};

const styles = {
  loanType: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  loanTypeText: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: colors.GRAY_XXDARK,
  },
  helpIconContainer: {
    position: 'relative',
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5px',
  },
  helpIcon: {
    maxWidth: '100%',
    maxHeight: '100%',
    cursor: 'pointer',
  },
  firstSection: {
    borderBottom: `1px solid ${colors.GRAY_LIGHT}`,
  },
  firstSectionContent: {
    padding: '30px 30px 10px', // leave room for 20px bottom margin of summary items
  },
  secondSectionContent: {
    padding: '30px 30px 10px',
  },
  flexContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  summaryItem: {
    width: '200px',
    marginBottom: '20px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  summaryItemTitle: {
    fontSize: '6px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    color: colors.GRAY_LIGHT,
    lineHeight: '10px',
    '@media (min-width: 1400px)': {
      fontSize: '10px',
    },
    '@media (min-width: 992px)': {
      fontSize: '8px',
    },
  },
  summaryItemValue: {
    fontSize: '12px',
    fontWeight: '500',
    color: colors.GRAY_XXDARK,
    marginTop: '2px',
    '@media (min-width: 1400px)': {
      fontSize: '20px',
    },
    '@media (min-width: 992px)': {
      fontSize: '16px',
    },
  },
  footerItemValue: {
    fontSize: '12px',
    fontWeight: '500',
    color: colors.GRAY_XXDARK,
    marginTop: '2px',
    '@media (min-width: 1400px)': {
      fontSize: '20px',
    },
    '@media (min-width: 992px)': {
      fontSize: '16px',
    },
  },
  overlay: {
    position: 'relative',
    backgroundColor: colors.GRAY_XXXLIGHT,
    borderRadius: '8px',
    minWidth: '300px',
    minHeight: '145px',
    paddingTop: '20px',
    paddingLeft: '20px',
    zIndex: '1000',
  },
  tooltipContainer: {
    width: '253px',
    padding: '20px',
    cursor: 'default',
    top: '36px',
    left: '-12px',
  },
  tooltipArrowContainerClassName: {
    bottom: '100%',
    left: '60%',
  },
  tooltipTitle: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '23px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  tooltipDescription: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '0px',
  },
};


function formatNumber(num) {
  return numeral(num).format('0,0');
}

function formatQin(qin) {
  return numeral(qin).format('0,0.00');
}

function formatInterestRate(ir) {
  const [wholeNumber, decimal] = ((ir * 100).toFixed(2)).split('.');
  return `${numeral(wholeNumber).format('0,0')}.${decimal}`;
}

function formatRepayment(num) {
  const [whole, decimal] = `${num.toFixed(2)}`.split('.');
  return `${numeral(whole).format('0,0')}.${decimal}`;
}

const TOOLTIP_TEXT = {
  highestReward: {
    label: 'Highest QIN Reward',
    title: 'Highest QIN Reward',
    description: 'These terms offer the highest QIN rewards in the pool, which is great if you’re looking to build your credit with OneDaijo and loan more money in the future. Be mindful of the interest rates, however.',
  },
  lowestInterest: {
    label: 'Lowest Interest',
    title: 'Lowest Interest Rate',
    description: 'These terms offer the lowest interest rate among the others, which is great if you’re looking to repay the least amount of money on top of your principal amount. Be mindful of the QIN reward, however.',
  },
};

class LoanTermsSummary extends PureComponent {
  constructor() {
    super();
    this.state = {
      showTooltip: false,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip() {
    const { showTooltip } = this.state;
    this.setState({ showTooltip: !showTooltip });
  }

  render() {
    const {
      cardClassName,
      classes,
      interestRate,
      offeredBy,
      onCardClick,
      qinReward,
      qinRequired,
      repaymentAmt,
      repaymentCurrency,
      repaymentDays,
      loanType,
    } = this.props;

    const { showTooltip } = this.state;

    let loanTypeElement = null;
    if (loanType !== '') {
      const tipInfo = TOOLTIP_TEXT[loanType];
      loanTypeElement = (
        <div className={ classes.loanType }>
          <div className={ classes.loanTypeText }>{ tipInfo.label }</div>
          <div className={ classes.helpIconContainer }>
            <Tooltip
              placement="top"
              show={ showTooltip }
              containerClassName={ classes.tooltipContainer }
              arrowContainerClassName={ classes.tooltipArrowContainerClassName }
            >
              <CloseIcon
                className={ classes.closeIcon }
                onClick={ this.toggleTooltip }
                sizePx={ 12 }
              />
              <div className={ classes.tooltipContent }>
                <div className={ classes.tooltipTitle }>{ tipInfo.title }</div>
                <div className={ classes.tooltipDescription }>{ tipInfo.description }</div>
              </div>
            </Tooltip>
            <img
              alt=""
              src={ helpIcon }
              className={ classes.helpIcon }
              onClick={ this.toggleTooltip }
            />
          </div>
        </div>
      );
    }

    return (
      <div className={ classes.main }>
        { loanTypeElement }
        <Card cardClassName={ cardClassName } onClick={ onCardClick }>
          <div className={ classes.firstSection }>
            <div className={ classes.firstSectionContent }>
              <div className={ classes.flexContent }>
                <div className={ classes.summaryItem }>
                  <div className={ classes.summaryItemTitle }>INTEREST RATE</div>
                  <div className={ classes.summaryItemValue }>{ formatInterestRate(interestRate) }%</div>
                </div>
                <div className={ classes.summaryItem }>
                  <div className={ classes.summaryItemTitle }>REWARD</div>
                  <div className={ classes.summaryItemValue }>{ formatQin(qinReward) } QIN</div>
                </div>
                <div className={ classes.summaryItem }>
                  <div className={ classes.summaryItemTitle }>QIN REQUIRED</div>
                  <div className={ classes.summaryItemValue }>{ formatQin(qinRequired) } QIN</div>
                </div>
                <div className={ classes.summaryItem }>
                  <div className={ classes.summaryItemTitle }>REPAYMENT PERIOD</div>
                  <div className={ classes.summaryItemValue }>{ formatNumber(repaymentDays) } days</div>
                </div>
                <div className={ classes.summaryItem }>
                  <div className={ classes.summaryItemTitle }>AMOUNT TO BE REPAID</div>
                  <div className={ classes.summaryItemValue }>{ formatRepayment(repaymentAmt) } { repaymentCurrency }</div>
                </div>
              </div>
            </div>
          </div>
          <div className={ classes.secondSection }>
            <div className={ classes.secondSectionContent }>
              <div className={ classes.flexContent }>
                <div className={ classes.summaryItem }>
                  <div className={ classes.summaryItemTitle }>OFFERED BY</div>
                  <div className={ classes.footerItemValue }>{ offeredBy }</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

LoanTermsSummary.propTypes = propTypes;
LoanTermsSummary.defaultProps = defaultProps;
export default injectSheet(styles)(LoanTermsSummary);
