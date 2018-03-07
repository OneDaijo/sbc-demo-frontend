import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import moment from 'moment';

import colors from '../../../utils/colors';

import LoanRow from './LoanRow';
import Card from '../../shared/Card';

import iconSortArrow from '../../../../assets/img/icon-sort-arrow-blue.svg';

const SORT_ORDERS = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  loans: PropTypes.arrayOf(PropTypes.object),
  userCreated: PropTypes.number,
  onSelectLoan: PropTypes.func.isRequired,
};

const defaultProps = {
  loans: [],
  userCreated: 0,
};

const styles = {
  card: {
    minWidth: '700px',
    boxShadow: `0px 25px 50px ${colors.GRAY_XXLIGHT}`,
  },
  rowBorder: {
    borderTop: `1px solid ${colors.GRAY_XXLIGHT}`,
    borderBottom: `1px solid ${colors.GRAY_XXLIGHT}`,
  },
  headWrapper: {
    extend: 'rowBorder',
    paddingTop: '17px',
    paddingRight: '40px',
    paddingBottom: '16px',
    paddingLeft: '40px',
  },
  rowWrapper: {
    extend: 'rowBorder',
    paddingTop: '25px',
    paddingRight: '40px',
    paddingBottom: '24px',
    paddingLeft: '40px',
    cursor: 'pointer',
  },
  rowContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnHead: {
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '22px',
    color: 'rgba(0, 72, 112, 0.5)',
  },
  sortableColumnHead: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    cursor: 'pointer',
  },
  sortArrow: {
    transition: 'transform 200ms',
    marginLeft: '17px',
  },
  sortArrowAsc: {
    transform: 'rotate(180deg)',
  },
  footer: {
    borderTop: `1px solid ${colors.GRAY_XXLIGHT}`,
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '22px',
    textAlign: 'center',
    paddingTop: '17px',
    paddingBottom: '16px',
  },
};


const LOAN_STATES = {
  REPAID: 'REPAID',
};

function formatDate(ts) {
  return moment(ts).format('MMM DD, YYYY');
}

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      sortOrder: SORT_ORDERS.DESC,
    };
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
  }

  toggleSortOrder() {
    const { sortOrder } = this.state;
    const newSortOrder = sortOrder === SORT_ORDERS.ASC ? SORT_ORDERS.DESC : SORT_ORDERS.ASC;
    this.setState({ sortOrder: newSortOrder });
  }

  render() {
    const {
      classes,
      loans,
      userCreated,
      onSelectLoan,
    } = this.props;

    const {
      sortOrder,
    } = this.state;

    const numLoans = loans.length;
    const pluralize = numLoans > 1 ? 's' : '';

    const arrowClassName = classnames(classes.sortArrow, {
      [classes.sortArrowAsc]: sortOrder === SORT_ORDERS.ASC,
    });

    const loanRows = loans.sort((a, b) => {
      const dateA = a.state === LOAN_STATES.REPAID ? a.created : a.created;
      const dateB = b.state === LOAN_STATES.REPAID ? b.created : b.created;
      const isDesc = sortOrder === SORT_ORDERS.DESC;

      if (dateA === dateB) {
        return isDesc ? b.amount - a.amount : a.amount - b.amount;
      }

      return isDesc ? dateB - dateA : dateA - dateB;
    })
    .map((loan) => {
      if (loan.state === LOAN_STATES.REPAID) {
        return (
          <div key={ loan.id } className={ classes.rowWrapper } onClick={ () => onSelectLoan(loan.id) }>
            <LoanRow loan={ loan } />
          </div>
        );
      }

      return (
        <NavLink to="/dashboard/loans" key={ loan.id }>
          <div className={ classes.rowWrapper }>
            <LoanRow loan={ loan } />
          </div>
        </NavLink>
      );
    });

    const footerRow = userCreated > 0 && (
      <div className={ classes.footer }>
        You joined OneDaijo on { formatDate(userCreated) } 🎂
      </div>
    );

    return (
      <Card cardClassName={ classes.card }>
        <div className={ classes.headWrapper }>
          <div className={ classes.rowContent }>
            <div className={ classes.columnHead }>{ numLoans } archived loan{ pluralize }</div>
            <div className={ classes.sortableColumnHead } onClick={ this.toggleSortOrder }>
              <div className={ classes.columnHead }>Date</div>
              <img
                src={ iconSortArrow }
                alt=""
                className={ arrowClassName }
              />
            </div>
          </div>
        </div>
        { loanRows }
        { footerRow }
      </Card>
    );
  }
}

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;
export default injectSheet(styles)(Overview);
