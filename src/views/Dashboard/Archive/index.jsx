import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import numeral from 'numeral';

import LoanStack from '../LoanStack';
import Overview from './Overview';
import Header from '../Header';

import {
  loadLoans as loadLoansAction,
} from '../../../actions/loans';

import {
  loadUser as loadUserAction,
} from '../../../actions/user';

import iconArrowLeft from '../../../../assets/img/icon-arrow-left-gray.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  loans: PropTypes.object,
  user: PropTypes.object,
  loadLoans: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const defaultProps = {
  loans: {},
  user: {},
};

const styles = {
  main: {
    height: 'auto',
    minHeight: '100vh',
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
    maxWidth: '660px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  goBack: {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '26px',
    color: 'rgba(0, 0, 0, 0.38)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  backArrow: {
    marginRight: '5px',
  },
  loanStackContainer: {
    marginTop: '40px',
  },
};


const DEFAULT_CURRENCY = 'PHP';

function formatNumber(num) {
  return numeral(num).format('0,0');
}
class Archive extends Component {
  constructor() {
    super();
    this.state = {
      selectedLoanId: null,
    };
    this.selectLoan = this.selectLoan.bind(this);
    this.resetView = this.resetView.bind(this);
  }

  componentDidMount() {
    const {
      loadLoans,
      loadUser,
      loans,
      user,
    } = this.props;

    const userExists = user.user && user.user.firstName;
    const loansExist = loans.loans && loans.loans.length > 0;

    if (!userExists) {
      loadUser();
    }

    if (!loansExist) {
      loadLoans();
    }
  }

  selectLoan(loanId) {
    this.setState({ selectedLoanId: loanId });
  }

  resetView() {
    this.setState({ selectedLoanId: null });
  }

  render() {
    const {
      classes,
      loans: loansWrapper,
      user: userWrapper,
    } = this.props;

    const {
      selectedLoanId,
    } = this.state;

    const {
      loans,
      loading: loansLoading,
    } = loansWrapper;

    const {
      user = {},
    } = userWrapper;

    let content;
    if (selectedLoanId !== null) {
      const selectedLoan = loans.find(loan => loan.id === selectedLoanId);

      const {
        memo,
        amount,
        currency = DEFAULT_CURRENCY,
      } = selectedLoan;

      content = (
        <div className={ classes.pageContent }>
          <div className={ classes.goBack } onClick={ this.resetView }>
            <img src={ iconArrowLeft } alt="" className={ classes.backArrow } />
            Back to Loan History
          </div>
          <div className={ classes.title }>
            { formatNumber(amount) } { currency } ({ memo })
          </div>
          <div className={ classes.loanStackContainer }>
            <LoanStack
              loan={ selectedLoan }
              borrowerName={ user.firstName }
              disableActions
            />
          </div>
        </div>
      );
    } else {
      content = (
        <div className={ classes.pageContent }>
          <div className={ classes.title }>Archive</div>
          <div className={ classes.overviewContainer }>
            <Overview
              loans={ loans }
              userCreated={ user.created }
              loading={ loansLoading }
              onSelectLoan={ this.selectLoan }
            />
          </div>
        </div>
      );
    }

    return (
      <div className={ classes.main }>
        <Header />
        { content }
      </div>
    );
  }
}

Archive.propTypes = propTypes;
Archive.defaultProps = defaultProps;
export default connect(
  ({ loans, user }) => ({ loans, user }),
  dispatch => bindActionCreators({
    loadLoans: loadLoansAction,
    loadUser: loadUserAction,
  }, dispatch),
)(injectSheet(styles)(Archive));
