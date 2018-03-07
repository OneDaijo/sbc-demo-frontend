import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import moment from 'moment';

import { LinearProgress } from 'material-ui/Progress';

import LoanTermsSummary from '../../shared/LoanTermsSummary';
import StackCard from '../../shared/Stack/StackCard';
import Button from '../../shared/Button';

import colors from '../../../utils/colors';

import iconPopoutActive from '../../../../assets/img/icon-popout-white.svg';
import iconPopoutInactive from '../../../../assets/img/icon-popout-gray.svg';
import iconDownload from '../../../../assets/img/icon-download-arrow-white.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  isCompleted: PropTypes.bool,
  loanTerms: PropTypes.arrayOf(PropTypes.object),
  selectedTerms: PropTypes.object,
  onCancelLoanClick: PropTypes.func,
  onSelectTermsClick: PropTypes.func,
  onContinueClick: PropTypes.func,
};

const defaultProps = {
  isCompleted: false,
  loanTerms: [],
  selectedTerms: {},
  onCancelLoanClick: () => {},
  onSelectTermsClick: () => {},
  onContinueClick: () => {},
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
  completedGroup: {
    textAlign: 'center',
  },
  completedTitle: {
    display: 'inline-block',
    marginTop: '115px',
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  completedBody: {
    display: 'inline-block',
    marginTop: '5px',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  progressBarRoot: {
    marginTop: '10px',
    height: '6px',
    width: '260px',
  },
  progressBarTrackColor: {
    backgroundColor: colors.GRAY_LIGHT,
  },
  progressBarColor: {
    backgroundColor: colors.BLUE,
  },
  eta: {
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: 'auto',
  },
  body: {
    marginTop: '40px',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  cardBottom: {
    marginTop: ({ termsReady }) => (termsReady ? '94px' : '76px'),
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardBottomRight: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  cancel: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  button: {
    paddingTop: '14px',
    paddingRight: '33px',
    paddingBottom: '15px',
    paddingLeft: '38px',
    marginLeft: '15px',
  },
  buttonContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: '500',
    color: ({ termsReady, selectedTerms }) => (termsReady || selectedTerms.id !== 'undefined' ? colors.WHITE : colors.GRAY_DARK),
  },
  loanTermsContainer: {
    marginTop: '22px',
  },
  buttonIcon: {
    marginLeft: '5px',
  },
};

const DEFAULT_OFFERED_BY = 'One Daijo Ltd.';

class Terms extends PureComponent {
  render() {
    const {
      classes,
      isCompleted,
      loanTerms,
      selectedTerms,
      onSelectTermsClick,
      onCancelLoanClick,
      onContinueClick,
      ...rest
    } = this.props;

    const progressClasses = {
      root: classes.progressBarRoot,
      primaryColor: classes.progressBarTrackColor,
      primaryColorBar: classes.progressBarColor,
    };

    const isTermsSelected = selectedTerms.id !== undefined;
    const termsReady = !isTermsSelected && loanTerms.length > 0;

    let content;
    if (isTermsSelected) {
      const {
        interestRate,
        qinReward,
        dueDate,
        amountOwed,
        offeredBy = DEFAULT_OFFERED_BY,
      } = selectedTerms;

      const daysTilDue = moment(dueDate).diff(moment(), 'days') + 1;

      content = (
        <div className={ classes.columnContent }>
          <div className={ classes.status }>Congrats on finding the one!</div>
          <div className={ classes.completedBody }>You selected loan terms from { offeredBy }.</div>
          <div className={ classes.loanTermsContainer }>
            <LoanTermsSummary
              interestRate={ interestRate }
              qinReward={ qinReward }
              repaymentAmt={ amountOwed }
              repaymentDays={ daysTilDue }
              offeredBy={ offeredBy }
            />
          </div>
        </div>
      );
    } else if (termsReady === false) {
      content = (
        <div className={ classes.columnContent }>
          <div className={ classes.status }>Loan terms are being crafted just for you.</div>
          <LinearProgress
            classes={ progressClasses }
            mode="indeterminate"
          />
          <div className={ classes.body }>
            External risk assessors (ERAs) are creating loan terms based on your application and profile.
          </div>
        </div>
      );
    } else {
      content = (
        <div className={ classes.completedGroup }>
          <div className={ classes.completedTitle }>Your loan term offers are ready!</div>
          <div className={ classes.completedBody }>
            Choose the one that fits your needs. If need help deciding, don’t hesitate to give us a call or send us a message.
          </div>
        </div>
      );
    }

    let buttonIcon;
    if (isTermsSelected) {
      buttonIcon = iconDownload;
    } else if (termsReady) {
      buttonIcon = iconPopoutActive;
    } else {
      buttonIcon = iconPopoutInactive;
    }

    const showEta = !termsReady && !isTermsSelected;
    const cardBottomContent = (
      <div className={ classes.cardBottom }>
        {
          showEta && (
            <div className={ classes.eta }>Offers ready within 15 min</div>
          )
        }
        <div className={ classes.cardBottomRight }>
          {
            !isTermsSelected && (
              <div
                className={ classes.cancel }
                onClick={ onCancelLoanClick }
              >
                Cancel application
              </div>
            )
          }
          <Button
            buttonClassName={ classes.button }
            active={ termsReady || isTermsSelected }
            onClick={ isTermsSelected ? onContinueClick : onSelectTermsClick }
          >
            <div className={ classes.buttonContent }>
              <div className={ classes.buttonText }>{ isTermsSelected ? 'Continue to funding' : 'Select terms' }</div>
              <img
                alt=""
                src={ buttonIcon }
                className={ classes.buttonIcon }
              />
            </div>
          </Button>
        </div>
      </div>
    );

    return (
      <StackCard
        isCompleted={ isCompleted }
        title="Select Terms"
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

Terms.propTypes = propTypes;
Terms.defaultProps = defaultProps;
export default injectSheet(styles)(Terms);
