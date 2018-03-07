import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import Card from '../Card';
import colors from '../../../utils/colors';

import iconCashPickup from '../../../../assets/img/icon-cash-pickup.svg';
import iconCashDeposit from '../../../../assets/img/icon-cash-deposit.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  cardClassName: PropTypes.string,
  optionType: PropTypes.oneOf(['pickup', 'cashDeposit']),
};

const defaultProps = {
  cardClassName: '',
  optionType: 'pickup',
};

const styles = {
  card: {
    maxWidth: '280px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingTop: '30px',
    paddingRight: '30px',
    paddingBottom: '30px',
    paddingLeft: '30px',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  title: {
    marginTop: '37px',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  description: {
    marginTop: '2px',
    fontSize: '14px',
    lineHeight: '21px',
    color: colors.GRAY_XXDARK,
  },
  eta: {
    marginTop: '30px',
    fontSize: '14px',
    lineHeight: '16px',
    color: colors.GRAY_XXDARK,
  },
};

const CARD_TYPE_OPTIONS = {
  pickup: {
    title: 'Cash Pickup',
    description: 'Get your money in cash at one of our partner stores.',
    eta: 'Ready in 6 hrs - 1 business day',
    iconSrc: iconCashPickup,
  },
  transfer: {
    title: 'Bank Transfer',
    description: 'Get your money deposited directly into your bank account.',
    eta: 'Arrives in 1 business day',
    iconSrc: 'TODO',
  },
  cashDeposit: {
    title: 'Cash Deposit',
    description: 'Repay your loan in cash at one of our partner stores.',
    eta: 'Available during business hours',
    iconSrc: iconCashDeposit,
  },
  onlinePayment: {
    title: 'Online Payment',
    description: 'Repay your loan via debit card or bank transfer.',
    eta: 'Sends immediately',
    iconSrc: 'TODO',
  },
};

class CollectDepositOption extends PureComponent {
  render() {
    const {
      cardClassName,
      classes,
      optionType,
    } = this.props;

    const cardOptions = CARD_TYPE_OPTIONS[optionType];
    const {
      title,
      description,
      eta,
      iconSrc,
    } = cardOptions;

    const cardClass = classnames(classes.card, {
      [cardClassName]: cardClassName !== '',
    });

    return (
      <Card cardClassName={ cardClass }>
        <div className={ classes.iconContainer }>
          <img
            src={ iconSrc }
            alt=""
            className={ classes.icon }
          />
        </div>
        <div className={ classes.cardBottom }>
          <div className={ classes.title }>
            { title }
          </div>
          <div className={ classes.description }>
            { description }
          </div>
          <div className={ classes.eta }>
            { eta }
          </div>
        </div>
      </Card>
    );
  }
}

CollectDepositOption.propTypes = propTypes;
CollectDepositOption.defaultProps = defaultProps;
export default injectSheet(styles)(CollectDepositOption);
