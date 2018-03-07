import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import MuiRadio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import colors from '../../utils/colors';

const propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  labelClassName: PropTypes.string,
  labelDisabledClassName: PropTypes.string,
  defaultClassName: PropTypes.string,
  checkedClassName: PropTypes.string,
  disabledClassName: PropTypes.string,
};

const defaultProps = {
  id: '',
  onChange: () => {},
  value: '',
  label: '',
  checked: false,
  className: '',
  labelClassName: '',
  labelDisabledClassName: '',
  defaultClassName: '',
  checkedClassName: '',
  disabledClassName: '',
};

const styles = {
  radioChecked: {
    color: colors.BLUE,
  },
  label: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '14px',
    fontWeight: '500',
  },
  radioDefault: {
    height: 'auto',
  },
};

class Radio extends Component {
  render() {
    const {
      classes,
      id,
      label,
      onChange,
      value,
      checked,
      className,
      labelClassName,
      labelDisabledClassName,
      defaultClassName,
      checkedClassName,
      disabledClassName,
    } = this.props;

    const defaultClass = classnames(classes.radioDefault, {
      [defaultClassName]: defaultClassName !== '',
    });

    const checkedClass = classnames(classes.radioChecked, {
      [checkedClassName]: checkedClassName !== '',
    });

    const disabledClass = classnames(classes.radioDisabled, {
      [disabledClassName]: disabledClassName !== '',
    });

    const radioClasses = {
      default: defaultClass,
      checked: checkedClass,
      disabled: disabledClass,
    };

    const labelClasses = {
      root: classnames(classes.root, { [className]: className !== '' }),
      label: classnames(classes.label, { [labelClassName]: labelClassName !== '' }),
      disabled: classnames(classes.labelDisabled, { [labelDisabledClassName]: labelDisabledClassName !== '' }),
    };

    const RadioComponent = (
      <MuiRadio
        classes={ radioClasses }
        onChange={ onChange }
        checked={ checked }
        disableRipple={ false }
      />
    );

    return (
      <FormControlLabel
        id={ id }
        value={ value }
        control={ RadioComponent }
        label={ label }
        classes={ labelClasses }
      />
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
export default injectSheet(styles)(Radio);
