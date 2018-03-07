import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';

import Card from '../../shared/Card';


const propTypes = {
  classes: PropTypes.object.isRequired,
  qinAmount: PropTypes.number,
};

const defaultProps = {
  qinAmount: 0,
};

const styles = {
  card: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  label: {
    textAlign: 'center',
    width: '100%',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  qinAmount: {
    textAlign: 'center',
    width: '100%',
    fontSize: '36px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.7)',
  },
};

function formatQin(qin) {
  return numeral(qin).format('0,0.00');
}

class TotalQin extends PureComponent {
  render() {
    const {
      classes,
      qinAmount,
    } = this.props;

    return (
      <Card cardClassName={ classes.card }>
        <div className={ classes.label }>TOTAL QIN</div>
        <div className={ classes.qinAmount }>{ formatQin(qinAmount) }</div>
      </Card>
    );
  }
}

TotalQin.propTypes = propTypes;
TotalQin.defaultProps = defaultProps;
export default injectSheet(styles)(TotalQin);
