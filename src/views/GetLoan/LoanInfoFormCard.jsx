import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FormButtons from './FormButtons';
import FormCard from './FormCard';
import SelectField from '../shared/SelectField';
import TextField from '../shared/TextField';

import iconCaret from '../../../assets/img/icon-caret-down-gray.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  loanMemo: PropTypes.string,
  loanPurpose: PropTypes.string,
  loanPurposeOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNext: PropTypes.func,
  onGoBack: PropTypes.func,
  onPurposeChange: PropTypes.func,
  onMemoChange: PropTypes.func,
};

const defaultProps = {
  loanMemo: '',
  loanPurpose: '',
  onGoBack: () => {},
  onNext: () => {},
  onPurposeChange: () => {},
  onMemoChange: () => {},
};

const styles = {
  question: {
    marginBottom: '40px',
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
  },
  selectPurpose: {
    icon: {
      top: '7px',
    },
    label: {
      textOverflow: 'visible',
      fontSize: '18px',
    },
  },
  selectContainer: {
    marginBottom: '12px',
  },
  selectRoot: {
    width: '420px',
  },
  textFieldRoot: {
    marginBottom: '2px',
    width: '420px',
  },
  memoCharCount: {
    marginBottom: '63px',
    width: '100%',
    fontSize: '12px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'right',
  },
};

const MAX_MEMO_LENGTH = 60;
class LoanInfoFormCard extends Component {
  render() {
    const {
      classes,
      loanPurposeOptions,
      onGoBack,
      onNext,
      onMemoChange,
      onPurposeChange,
      loanPurpose,
      loanMemo,
    } = this.props;

    const loanMemoEntered = loanMemo !== '';
    const loanPurposeSelected = loanPurpose !== '';
    const buttonEnabled = loanMemoEntered && loanPurposeSelected;

    const dropDownMenuProps = {
      iconButton: (
        <img
          alt=""
          src={ iconCaret }
        />
      ),
    };

    return (
      <FormCard>
        <div className={ classes.question }>What will you be using the money for?</div>
        <SelectField
          id="GetLoan:FirstQuestion:loanPurpose"
          label="Purpose"
          placeholder="Select..."
          onChange={ event => onPurposeChange(event.target.value) }
          options={ loanPurposeOptions }
          value={ loanPurpose }
          dropDownMenuProps={ dropDownMenuProps }
          rootClassName={ classes.selectRoot }
          className={ classes.selectContainer }
          labelFixed
        />
        <TextField
          id="GetLoan:FirstQuestion:loanMemo"
          label="Memo"
          placeholder="e.g For Car Repairs"
          onChange={ event => onMemoChange(event.target.value) }
          value={ loanMemo }
          rootClassName={ classes.textFieldRoot }
          labelFixed
        />
        <div className={ classes.memoCharCount }>{ loanMemo.length } / { MAX_MEMO_LENGTH }</div>
        <FormButtons
          buttonEnabled={ buttonEnabled }
          onGoBackClick={ onGoBack }
          onNextClick={ onNext }
        />
      </FormCard>
    );
  }
}

LoanInfoFormCard.propTypes = propTypes;
LoanInfoFormCard.defaultProps = defaultProps;
export default injectSheet(styles)(LoanInfoFormCard);
