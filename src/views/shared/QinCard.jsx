import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import numeral from 'numeral';

import Card from './Card';

import iconQinCard from '../../../assets/img/icon-qin-card-logo.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  cardClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  iconClassName: PropTypes.string,
  qinAmount: PropTypes.number,
  qinClassName: PropTypes.string,
};

const defaultProps = {
  cardClassName: '',
  iconClassName: '',
  labelClassName: '',
  labelText: 'REWARD',
  qinClassName: '',
  qinAmount: 0,
};

const styles = {
  card: {
    border: '1px solid #F0F0F0',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
    padding: '30px 38px 37px 36px',
  },
  label: {
    marginTop: '10px',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  qin: {
    marginTop: '5px',
    fontSize: '24px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.7)',
  },
};

function formatQin(val) {
  return val > 0 ? numeral(val).format('0,0.00') : 0;
}

class QinCard extends PureComponent {
  render() {
    const {
      classes,
      cardClassName,
      iconClassName,
      labelClassName,
      qinClassName,
      labelText,
      qinAmount,
    } = this.props;

    const cardClass = classnames(classes.card, {
      [cardClassName]: cardClassName !== '',
    });

    const qinClass = classnames(classes.qin, {
      [qinClassName]: qinClassName !== '',
    });

    const labelClass = classnames(classes.label, {
      [labelClassName]: labelClassName !== '',
    });

    return (
      <Card cardClassName={ cardClass }>
        <img
          alt="qin logo detailed"
          className={ iconClassName }
          src={ iconQinCard }
        />
        <div className={ classes.qinReward }>
          <div className={ labelClass }>{ labelText }</div>
          <div className={ qinClass }>{ formatQin(qinAmount) } QIN</div>
        </div>
      </Card>
    );
  }
}

QinCard.propTypes = propTypes;
QinCard.defaultProps = defaultProps;
export default injectSheet(styles)(QinCard);
