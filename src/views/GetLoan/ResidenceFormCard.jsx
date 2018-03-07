import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FormCard from './FormCard';
import FormButtons from './FormButtons';
import TextField from '../shared/TextField';
import Radio from '../shared/Radio';
import RadioGroup from '../shared/RadioGroup';

const propTypes = {
  classes: PropTypes.object.isRequired,
  onGoBack: PropTypes.func,
  onNext: PropTypes.func,
  addr1: PropTypes.string,
  addr2: PropTypes.string,
  district: PropTypes.string,
  city: PropTypes.string,
  postal: PropTypes.string,
  province: PropTypes.string,
  status: PropTypes.string,
  rentAmt: PropTypes.string,
  error: PropTypes.string,
  onAddr1Change: PropTypes.func,
  onAddr2Change: PropTypes.func,
  onDistrictChange: PropTypes.func,
  onCityChange: PropTypes.func,
  onPostalChange: PropTypes.func,
  onProvinceChange: PropTypes.func,
  onStatusChange: PropTypes.func,
  onRentAmtChange: PropTypes.func,
};

const defaultProps = {
  onGoBack: () => {},
  onNext: () => {},
  addr1: '',
  addr2: '',
  district: '',
  city: '',
  postal: '',
  province: '',
  status: '',
  rentAmt: '',
  error: '',
  onAddr1Change: () => {},
  onAddr2Change: () => {},
  onDistrictChange: () => {},
  onCityChange: () => {},
  onPostalChange: () => {},
  onProvinceChange: () => {},
  onStatusChange: () => {},
  onRentAmtChange: () => {},
};

const styles = {
  title: {
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
  },
  formInputs: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginTop: '30px',
  },
  textFieldRootShort: {
    width: '200px',
  },
  textFieldRootLong: {
    width: '420px',
  },
  textFieldAdornment: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  radioButtonGroup: {
    width: '100%',
    marginTop: '30px',
  },
  secondRadioButton: {
    marginTop: '30px',
  },
  inputMargin: {
    marginTop: '30px',
  },
  formButtonsContainer: {
    width: '100%',
    marginTop: '40px',
  },
  errorMessage: {
    color: '#d60000',
    marginTop: '20px',
    fontSize: '14px',
  },
};


class ResidenceFormCard extends Component {
  render() {
    const {
      classes,
      onGoBack,
      onNext,
      addr1,
      addr2,
      district,
      city,
      postal,
      province,
      status,
      rentAmt,
      error,
      onAddr1Change,
      onAddr2Change,
      onDistrictChange,
      onCityChange,
      onPostalChange,
      onProvinceChange,
      onStatusChange,
      onRentAmtChange,
    } = this.props;

    const buttonEnabled = addr1 !== ''
      && district !== ''
      && city !== ''
      && postal !== ''
      && province !== ''
      && (status === 'own' || (status === 'rent' && rentAmt !== ''));

    let rentAmtComponent;
    const showRentAmt = status === 'rent';
    if (showRentAmt) {
      rentAmtComponent = (
        <TextField
          id="GetLoan:ThirdQuestion:rentAmt"
          label="Monthly rent amount"
          onChange={ event => onRentAmtChange(event.target.value) }
          value={ rentAmt }
          adornment="PHP"
          adornmentPosition="end"
          className={ classes.inputMargin }
          rootClassName={ classes.textFieldRootLong }
          adornmentRootClassName={ classes.textFieldAdornment }
        />
      );
    }

    return (
      <FormCard>
        <div className={ classes.title }>Residence information</div>
        <div className={ classes.formInputs }>
          <TextField
            id="GetLoan:ThirdQuestion:addr1"
            label="Address Line 1"
            onChange={ event => onAddr1Change(event.target.value) }
            value={ addr1 }
            rootClassName={ classes.textFieldRootLong }
          />
          <TextField
            id="GetLoan:ThirdQuestion:addr2"
            label="Address Line 2 (optional)"
            onChange={ event => onAddr2Change(event.target.value) }
            value={ addr2 }
            className={ classes.inputMargin }
            rootClassName={ classes.textFieldRootLong }
          />
          <div className={ classes.inputGroup }>
            <TextField
              id="GetLoan:ThirdQuestion:disctrict"
              label="District/Barangay"
              onChange={ event => onDistrictChange(event.target.value) }
              value={ district }
              rootClassName={ classes.textFieldRootShort }
            />
            <TextField
              id="GetLoan:ThirdQuestion:city"
              label="City/Municipality"
              onChange={ event => onCityChange(event.target.value) }
              value={ city }
              rootClassName={ classes.textFieldRootShort }
            />
          </div>
          <div className={ classes.inputGroup }>
            <TextField
              id="GetLoan:ThirdQuestion:postal"
              label="Postal code"
              onChange={ event => onPostalChange(event.target.value) }
              value={ postal }
              rootClassName={ classes.textFieldRootShort }
            />
            <TextField
              id="GetLoan:ThirdQuestion:province"
              label="Province"
              onChange={ event => onProvinceChange(event.target.value) }
              value={ province }
              rootClassName={ classes.textFieldRootShort }
            />
          </div>
          <div className={ classes.radioButtonGroup }>
            <RadioGroup
              id="GetLoan:ThirdQuestion:status"
              name="residenceStatus"
              value={ status }
              onChange={ (event, value) => onStatusChange(value) }
            >
              <Radio
                label="I own this address"
                value="own"
              />
              <Radio
                label="I pay rent here"
                value="rent"
                className={ classes.secondRadioButton }
              />
            </RadioGroup>
          </div>
        </div>
        { rentAmtComponent }
        <FormButtons
          className={ classes.formButtonsContainer }
          buttonEnabled={ buttonEnabled }
          onNextClick={ onNext }
          onGoBackClick={ onGoBack }
        />
        <div className={ classes.errorMessage }>{ error }</div>
      </FormCard>
    );
  }
}

ResidenceFormCard.propTypes = propTypes;
ResidenceFormCard.defaultProps = defaultProps;
export default injectSheet(styles)(ResidenceFormCard);

