import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FormCard from './FormCard';
import FormButtons from './FormButtons';
import TextField from '../shared/TextField';
import SelectField from '../shared/SelectField';

const propTypes = {
  classes: PropTypes.object.isRequired,
  onGoBack: PropTypes.func,
  onNext: PropTypes.func,
  currency: PropTypes.string,
  statusOptions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
  educationOptions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
  monthOptions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })),
  yearOptions: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.number })),
  status: PropTypes.string,
  jobTitle: PropTypes.string,
  startMonth: PropTypes.number,
  startYear: PropTypes.number,
  income: PropTypes.number,
  education: PropTypes.string,
  error: PropTypes.string,
  onStatusChange: PropTypes.func,
  onJobTitleChange: PropTypes.func,
  onStartMonthChange: PropTypes.func,
  onStartYearChange: PropTypes.func,
  onIncomeChange: PropTypes.func,
  onEducationChange: PropTypes.func,
};

const defaultProps = {
  onGoBack: () => {},
  onNext: () => {},
  currency: 'PHP',
  statusOptions: [],
  educationOptions: [],
  monthOptions: [],
  yearOptions: [],
  status: '',
  jobTitle: '',
  startMonth: 0,
  startYear: 0,
  income: 0,
  education: '',
  error: '',
  onStatusChange: () => {},
  onJobTitleChange: () => {},
  onStartMonthChange: () => {},
  onStartYearChange: () => {},
  onIncomeChange: () => {},
  onEducationChange: () => {},
};

const styles = {
  title: {
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
  },
  employedFields: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    width: '100%',
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
  inputLong: {
    width: '420px',
  },
  inputShort: {
    width: '200px',
  },
  inputMargin: {
    marginTop: '30px',
  },
  formButtonsContainer: {
    marginTop: '40px',
    width: '100%',
  },
  errorMessage: {
    color: '#d60000',
    marginTop: '20px',
    fontSize: '14px',
  },
};


class EmploymentFormCard extends Component {
  render() {
    const {
      classes,
      onGoBack,
      onNext,
      currency,
      statusOptions,
      educationOptions,
      monthOptions,
      yearOptions,
      status,
      jobTitle,
      startMonth,
      startYear,
      income,
      education,
      error,
      onStatusChange,
      onJobTitleChange,
      onStartMonthChange,
      onStartYearChange,
      onIncomeChange,
      onEducationChange,
    } = this.props;

    const employedFieldsFilled = status === 'employed'
      && jobTitle !== ''
      && startMonth !== ''
      && startYear !== ''
      && income !== '';

    const buttonEnabled = education !== ''
      && status !== ''
      && (status !== 'employed' || employedFieldsFilled);

    let employedFields;
    if (status === 'employed') {
      employedFields = (
        <div className={ classes.employedFields }>
          <TextField
            id="GetLoan:FourthQuestion:jobTitle"
            label="Job title"
            onChange={ event => onJobTitleChange(event.target.value) }
            value={ jobTitle }
            className={ classes.inputMargin }
            rootClassName={ classes.inputLong }
          />
          <div className={ classes.inputGroup }>
            <SelectField
              id="GetLoan:FourthQuestion:startMonth"
              label="Start date"
              placeholder="Month"
              onChange={ event => onStartMonthChange(event.target.value) }
              options={ monthOptions }
              value={ `${startMonth}` }
              rootClassName={ classes.inputShort }
              labelFixed
            />
            <SelectField
              id="GetLoan:FourthQuestion:startYear"
              label=""
              placeholder="Year"
              onChange={ event => onStartYearChange(event.target.value) }
              options={ yearOptions }
              value={ `${startYear}` }
              rootClassName={ classes.inputShort }
            />
          </div>
          <TextField
            id="GetLoan:FourthQuestion:income"
            label="Monthly income"
            adornment={ currency }
            adornmentPosition="end"
            onChange={ event => onIncomeChange(event.target.value) }
            value={ `${income}` }
            className={ classes.inputMargin }
            rootClassName={ classes.inputLong }
          />
        </div>
      );
    }

    return (
      <FormCard>
        <div className={ classes.title }>Employment information</div>
        <div className={ classes.formInputs }>
          <SelectField
            id="GetLoan:FourthQuestion:status"
            label="Employment Status"
            placeholder="Select..."
            onChange={ event => onStatusChange(event.target.value) }
            options={ statusOptions }
            value={ status }
            rootClassName={ classes.inputLong }
            labelFixed
          />
          { employedFields }
          <SelectField
            id="GetLoan:FourthQuestion:education"
            label="Highest level of education"
            placeholder="Select..."
            onChange={ event => onEducationChange(event.target.value) }
            options={ educationOptions }
            value={ education }
            className={ classes.inputMargin }
            rootClassName={ classes.inputLong }
            labelFixed
          />
        </div>
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

EmploymentFormCard.propTypes = propTypes;
EmploymentFormCard.defaultProps = defaultProps;
export default injectSheet(styles)(EmploymentFormCard);
