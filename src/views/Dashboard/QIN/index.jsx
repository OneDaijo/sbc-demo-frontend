import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QinHistory from './QinHistory';
import TotalQin from './TotalQin';
import Header from '../Header';
import QinCard from '../../shared/QinCard';

import {
  loadActiveLoan as loadActiveLoanAction,
} from '../../../actions/activeLoan';
import {
  loadLoans as loadLoansAction,
} from '../../../actions/loans';
import {
  loadUser as loadUserAction,
} from '../../../actions/user';

const propTypes = {
  classes: PropTypes.object.isRequired,
  activeLoan: PropTypes.object,
  loans: PropTypes.object,
  user: PropTypes.object,
  loadActiveLoan: PropTypes.func.isRequired,
  loadLoans: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const defaultProps = {
  activeLoan: {},
  loans: {},
  user: {},
};

const styles = {
  main: {
    height: 'auto',
    minHeight: '100vh',
    minWidth: '840px',
    backgroundColor: '#FAFCFC',
  },
  pageContent: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '145px',
    paddingBottom: '125px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    textAlign: 'center',
    color: '#000000',
  },
  fullWidth: {
    width: '840px',
  },
  totalQinContainer: {
    width: '415px',
    height: '220px',
  },
  qinCardContainer: {
    marginLeft: '10px',
    width: '415px',
    height: '220px',
    textAlign: 'center',
  },
  top: {
    marginTop: '20px',
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  qinCard: {
    height: '100%',
  },
  qinTable: {
    marginTop: '20px',
    width: '840px',
  },
};


class QIN extends Component {
  render() {
    const {
      classes,
      activeLoan: {
        loan: activeLoan,
      },
      loans: loansWrapper,
      user: userWrapper,
    } = this.props;

    const acceptedTerms = activeLoan && activeLoan.acceptedTerms;
    const qinReward = acceptedTerms && acceptedTerms.qinReward;

    const {
      loans,
    } = loansWrapper;

    const {
      user = {},
    } = userWrapper;

    return (
      <div className={ classes.main }>
        <Header />
        <div className={ classes.pageContent }>
          <div className={ classes.title }>QIN Management</div>
          <div className={ classes.top }>
            <div className={ classes.totalQinContainer }>
              <TotalQin
                qinAmount={ user.qinBalance }
              />
            </div>
            <div className={ classes.qinCardContainer }>
              <QinCard
                labelText="PENDING REWARD"
                qinAmount={ qinReward }
                cardClassName={ classes.qinCard }
              />
            </div>
          </div>
          <div className={ classes.qinTable }>
            <QinHistory
              loans={ loans }
              activeLoan={ activeLoan }
              userCreated={ user.created }
            />
          </div>
        </div>
      </div>
    );
  }
}

QIN.propTypes = propTypes;
QIN.defaultProps = defaultProps;
export default connect(
  ({ activeLoan, loans, user }) => ({ activeLoan, loans, user }),
  dispatch => bindActionCreators({
    loadActiveLoan: loadActiveLoanAction,
    loadLoans: loadLoansAction,
    loadUser: loadUserAction,
  }, dispatch),
)(injectSheet(styles)(QIN));
