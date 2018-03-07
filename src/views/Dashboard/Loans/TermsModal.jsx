import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import LoanTermsSummary from '../../shared/LoanTermsSummary';
import Modal from '../../shared/Modal';
import Button from '../../shared/Button';

import checkmarkIcon from '../../../../assets/img/icon-checkmark-white.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  onConfirmClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  onModalClick: PropTypes.func,
  terms: PropTypes.arrayOf(PropTypes.object),
  show: PropTypes.bool,
};

const defaultProps = {
  onConfirmClick: () => {},
  onCloseClick: () => {},
  onModalClick: () => {},
  show: false,
  terms: [],
};

const styles = {
  modal: {
    padding: '40px',
  },
  card: {
    opacity: '0.5',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
    transition: 'box-shadow 200ms, opacity 200ms',
    '&:hover': {
      opacity: '1',
      boxShadow: '0px 25px 50px rgba(0, 0, 0, 0.15)',
    },
  },
  selectedCard: {
    opacity: '1',
    boxShadow: '0px 25px 50px rgba(0, 0, 0, 0.15)',
    transition: 'box-shadow 200ms, opacity 200ms',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    textAlign: 'center',
  },
  flex: {
    marginTop: '40px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    '@media (min-width: 1400px)': {
      marginTop: '60px',
    },
  },
  termsItem: {
    margin: '0px 10px',
    cursor: 'pointer',
  },
  bottom: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '30px',
    '@media (min-width: 1400px)': {
      marginTop: '50px',
    },
  },
  goBack: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  button: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    fontSize: '14px',
    paddingTop: '16px',
    paddingRight: '30px',
    paddingBottom: '15px',
    paddingLeft: '30px',
    marginLeft: '15px',
  },
  checkmark: {
    marginLeft: '5px',
  },
};


class TermsModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedTerm: null,
    };

    this.selectTerm = this.selectTerm.bind(this);
  }

  selectTerm(termId) {
    this.setState({ selectedTerm: termId });
  }

  renderTerms() {
    const {
      classes,
      terms,
    } = this.props;
    const { selectedTerm } = this.state;

    const sortedTerms = [...terms].sort((a, b) => {
      const { qinReward: aQinReward, interestRate: aInterestRate, qinRequired: aQinRequired } = a;
      const { qinReward: bQinReward, interestRate: bInterestRate, qinRequired: bQinRequired } = b;

      return (bQinReward - aQinReward) || (aInterestRate - bInterestRate) || (aQinRequired - bQinRequired);
    });

    let highestRewardId = null;
    let lowestInterestId = null;
    sortedTerms.reduce(({ highestReward, lowestInterest }, term) => {
      const { qinReward, interestRate, id: termId } = term;
      const isHighestReward = (qinReward > 0 && highestReward === null) || (qinReward > highestReward);
      const isLowestInterest = (interestRate > 0 && lowestInterest === null) || (interestRate < lowestInterest);

      highestRewardId = isHighestReward ? termId : highestRewardId;
      lowestInterestId = isLowestInterest ? termId : lowestInterestId;

      return {
        highestReward: isHighestReward ? qinReward : highestReward,
        lowestInterest: isLowestInterest ? interestRate : lowestInterest,
      };
    }, { highestReward: null, lowestInterest: null });

    return sortedTerms.map((term) => {
      const {
        id,
        qinReward,
        qinRequired,
        repaymentDays,
        amountOwed,
        interestRate,
        offeredBy,
      } = term;

      let loanType = '';
      if (highestRewardId === id) {
        loanType = 'highestReward';
      } else if (lowestInterestId === id) {
        loanType = 'lowestInterest';
      }

      return (
        <div
          key={ `LoanTermsModal:loan-${id}` } // eslint-disable-line react/no-array-index-key
          className={ classes.termsItem }
        >
          <LoanTermsSummary
            cardClassName={ selectedTerm === id ? classes.selectedCard : classes.card }
            interestRate={ interestRate }
            offeredBy={ offeredBy }
            onCardClick={ () => this.selectTerm(id) }
            qinRequired={ qinRequired }
            qinReward={ qinReward }
            repaymentAmt={ amountOwed }
            repaymentDays={ repaymentDays }
            loanType={ loanType }
          />
        </div>
      );
    });
  }

  render() {
    const {
      classes,
      onConfirmClick,
      onCloseClick,
      onModalClick,
      show,
    } = this.props;

    const {
      selectedTerm,
    } = this.state;

    return (
      <Modal
        show={ show }
        onModalClick={ onModalClick }
        onCloseClick={ onCloseClick }
        modalClassName={ classes.modal }
      >
        <div className={ classes.title }>
          Select your loan terms
        </div>
        <div className={ classes.flex }>
          { this.renderTerms() }
        </div>
        <div className={ classes.bottom }>
          <div
            className={ classes.goBack }
            onClick={ onCloseClick }
          >
            Go back
          </div>
          <Button
            active={ selectedTerm !== null }
            buttonClassName={ classes.button }
            onClick={ () => onConfirmClick(selectedTerm) }
          >
            <span>Confirm Selection</span>
            <img
              alt=""
              src={ checkmarkIcon }
              className={ classes.checkmark }
            />
          </Button>
        </div>
      </Modal>
    );
  }
}

TermsModal.propTypes = propTypes;
TermsModal.defaultProps = defaultProps;
export default injectSheet(styles)(TermsModal);
