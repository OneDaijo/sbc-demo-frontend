import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import MuiCheckbox from 'material-ui/Checkbox';
import {
  FormGroup as MuiFormGroup,
  FormControlLabel as MuiFormControlLabel,
} from 'material-ui/Form';

import colors from '../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  checkboxCheckedClassName: PropTypes.string,
  checkboxDefaultClassName: PropTypes.string,
  disabled: PropTypes.bool,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string,
};

const defaultProps = {
  checked: false,
  checkboxCheckedClassName: '',
  checkboxDefaultClassName: '',
  disabled: false,
  label: '',
  labelClassName: '',
  onChange: () => {},
  value: '',
};

const styles = {
  checkboxDefault: {},
  checkboxChecked: {
    color: colors.GRAY_XXDARK,
  },
  label: {
    fontSize: '14px',
    lineHeight: '16px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
};

class Checkbox extends PureComponent {
  render() {
    const {
      checked,
      checkboxCheckedClassName,
      checkboxDefaultClassName,
      classes,
      disabled,
      label,
      labelClassName,
      onChange,
      value,
    } = this.props;

    const checkboxClasses = {
      default: classnames(classes.checkboxDefault, { [checkboxDefaultClassName]: checkboxDefaultClassName !== '' }),
      checked: classnames(classes.checkboxChecked, { [checkboxCheckedClassName]: checkboxCheckedClassName !== '' }),
    };

    const formControlClasses = {
      label: classnames(classes.label, { [labelClassName]: labelClassName !== '' }),
    };

    const checkbox = (
      <MuiCheckbox
        checked={ checked }
        classes={ checkboxClasses }
        disabled={ disabled }
        disableRipple={ false }
        onChange={ onChange }
        value={ value }
      />
    );

    return (
      <MuiFormGroup>
        <MuiFormControlLabel
          classes={ formControlClasses }
          label={ label }
          control={ checkbox }
        />
      </MuiFormGroup>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
export default injectSheet(styles)(Checkbox);
