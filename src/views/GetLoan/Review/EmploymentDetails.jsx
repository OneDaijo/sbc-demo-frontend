import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import moment from 'moment';

import LabeledField from './LabeledField';
import educationOptions from '../utils/educationOptions';
import employmentOptions from '../utils/employmentOptions';
import monthOptions from '../utils/monthOptions';
import getOptionsMap from '../utils/getOptionsMap';

const propTypes = {
  classes: PropTypes.object.isRequired,
  employmentStatus: PropTypes.string.isRequired,
  employmentJobTitle: PropTypes.string,
  employmentStartMonth: PropTypes.number,
  employmentStartYear: PropTypes.number,
  employmentEducation: PropTypes.string.isRequired,
};

const defaultProps = {
  employmentJobTitle: '',
  employmentStartMonth: 0,
  employmentStartYear: 0,
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
    alignItems: 'center',
    width: '100%',
  },
  item: {
    marginTop: '5px',
  },
};

class EmploymentDetails extends Component {
  render() {
    const {
      classes,
      employmentStatus,
      employmentJobTitle,
      employmentStartMonth,
      employmentStartYear,
      employmentEducation,
    } = this.props;

    const isEmployed = employmentStatus === 'employed';
    const jobTitleElement = isEmployed && (
      <LabeledField
        className={ classes.item }
        label="Job title"
      >
        { employmentJobTitle }
      </LabeledField>
    );

    const startDateElement = isEmployed && (
      <LabeledField
        className={ classes.item }
        label="Start date"
      >
        { getOptionsMap(monthOptions)[employmentStartMonth] } { employmentStartYear }
      </LabeledField>
    );

    const employmentText = getOptionsMap(employmentOptions)[employmentStatus];
    const educationText = getOptionsMap(educationOptions)[employmentEducation];

    return (
      <div className={ classes.main }>
        <div className={ classes.title }>Employment Details</div>
        <div className={ classes.flexContent }>
          <LabeledField label="Status">{ employmentText }</LabeledField>
          { jobTitleElement }
          { startDateElement }
          <LabeledField className={ classes.item } label="Highest level of education">{ educationText }</LabeledField>
        </div>
      </div>
    );
  }
}

EmploymentDetails.propTypes = propTypes;
EmploymentDetails.defaultProps = defaultProps;
export default injectSheet(styles)(EmploymentDetails);
