import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';
import moment from 'moment';

import LabeledField from './LabeledField';

const propTypes = {
  classes: PropTypes.object.isRequired,
  borrowerFirstName: PropTypes.string.isRequired,
  borrowerLastName: PropTypes.string.isRequired,
  borrowerDateOfBirth: PropTypes.string.isRequired,
  borrowerPhoneNumber: PropTypes.string.isRequired,
  residenceAddr1: PropTypes.string.isRequired,
  residenceAddr2: PropTypes.string,
  residenceDistrict: PropTypes.string.isRequired,
  residenceCity: PropTypes.string.isRequired,
  residencePostal: PropTypes.string.isRequired,
  residenceProvince: PropTypes.string.isRequired,
  residenceStatus: PropTypes.string.isRequired,
  residenceRentAmt: PropTypes.number,
};

const defaultProps = {
  residenceAddr2: '',
  residenceRentAmt: 0,
};

const styles = {
  main: {
    width: '100%',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '30px',
    color: '#000000',
  },
  flexContent: {
    marginTop: '10px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  flexRowContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  firstColumn: {
    width: '200px',
  },
  secondColumn: {
    width: '200px',
    marginLeft: '20px',
  },
  item: {
    marginTop: '5px',
  },
  addressLine: {
    maxWidth: '100%',
    whiteSpace: 'normal',
  },
};


function formatNumber(val) {
  return numeral(val).format('0,0');
}

function capitalize(str) {
  return str.replace(/^[a-z]/, letter => letter.toUpperCase());
}

class BorrowerDetails extends Component {
  render() {
    const {
      classes,
      borrowerFirstName,
      borrowerLastName,
      borrowerDateOfBirth,
      borrowerPhoneNumber,
      residenceAddr1,
      residenceAddr2,
      residenceCity,
      residenceDistrict,
      residencePostal,
      residenceProvince,
      residenceStatus,
      residenceRentAmt,
    } = this.props;

    const formattedDob = moment(borrowerDateOfBirth, 'MM/DD/YYYY').format('MMMM DD, YYYY');
    const addressLine2 = residenceAddr2 ? <div className={ classes.addressLine2 }>{ residenceAddr2 }</div> : null;
    const address = (
      <div>
        <div className={ classes.addressLine }>{ residenceAddr1 }</div>
        { addressLine2 }
        <div className={ classes.addressLine }>{ residenceDistrict }, { residenceCity }</div>
        <div className={ classes.addressLine }>{ residencePostal }, { residenceProvince }</div>
      </div>
    );

    const rentAmt = residenceStatus === 'rent'
      ? <LabeledField className={ classes.item } label="Monthly Rent">{ formatNumber(residenceRentAmt) } PHP</LabeledField>
      : null;

    return (
      <div className={ classes.main }>
        <div className={ classes.title }>Borrower Details</div>
        <div className={ classes.flexContent }>
          <LabeledField label="Name">{ borrowerFirstName } { borrowerLastName }</LabeledField>
          <div className={ classes.flexRowContent }>
            <div className={ classes.firstColumn }>
              <LabeledField className={ classes.item }label="Date of birth">{ formattedDob }</LabeledField>
              <LabeledField className={ classes.item } label="Address">{ address }</LabeledField>
            </div>
            <div className={ classes.secondColumn }>
              <LabeledField className={ classes.item } label="Phone number">{ borrowerPhoneNumber }</LabeledField>
              <LabeledField className={ classes.item } label="Residence Status">{ capitalize(residenceStatus) }</LabeledField>
              { rentAmt }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BorrowerDetails.propTypes = propTypes;
BorrowerDetails.defaultProps = defaultProps;
export default injectSheet(styles)(BorrowerDetails);
