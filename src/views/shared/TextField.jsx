import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';

import { FormControl } from 'material-ui/Form';
import Input, { InputAdornment, InputLabel } from 'material-ui/Input';

import CustomMaskedInput from './CustomMaskedInput';
import colors from '../../utils/colors';


const propTypes = {
  adornment: PropTypes.string,
  adornmentPosition: PropTypes.oneOf(['start', 'end']),
  adornmentRootClassName: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  containerClassName: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelFixed: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inkbarClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  labelRootClassName: PropTypes.string,
  labelShrinkClassName: PropTypes.string,
  mask: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rootClassName: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password']),
  underlineClassName: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  adornment: '',
  adornmentPosition: 'start',
  adornmentRootClassName: '',
  className: '',
  containerClassName: '',
  disabled: false,
  inkbarClassName: '',
  inputClassName: '',
  label: '',
  labelFixed: undefined,
  labelRootClassName: '',
  labelShrinkClassName: '',
  mask: [],
  onChange: () => {},
  placeholder: '',
  rootClassName: '',
  type: 'text',
  underlineClassName: '',
  value: '',
};

const styles = {
  root: {
    fontSize: '18px',
  },
  adornmentRoot: {
    fontSize: '18px',
    fontWeight: 'normal',
    color: 'rgba(0, 0, 0, 0.38)',
    background: 'transparent',
  },
  inputFormControl: {
    marginTop: '12px',
  },
  label: {
    fontSize: '18px',
    color: 'rgba(0, 0, 0, 0.38)',
    top: '-4px',
  },
  labelShrink: {
    fontSize: '16px',
    top: '0px',
  },
  labelFocused: {
    color: '#0086BF',
    transition: 'color 200ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
  },
  input: {
    fontSize: '18px',
    color: 'rgba(0, 0, 0, 0.7)',
    '&:placeholder': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '&::-webkit-input-placeholder': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '&::-moz-placeholder': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '&:-ms-input-placeholder': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
    '&:-moz-placeholder': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
  },
  underline: {
    '&:before': {
      backgroundColor: colors.GRAY_LIGHT,
    },
  },
  inkbar: {
    '&:after': {
      backgroundColor: colors.BLUE,
    },
  },
};

class TextField extends PureComponent {
  render() {
    const {
      adornment,
      adornmentPosition,
      adornmentRootClassName,
      classes,
      className,
      containerClassName,
      disabled,
      id,
      inkbarClassName,
      inputClassName,
      labelRootClassName,
      labelShrinkClassName,
      label,
      labelFixed,
      mask,
      onChange,
      placeholder,
      rootClassName,
      type,
      underlineClassName,
      value,
    } = this.props;

    const customClasses = {
      root: classnames(classes.root, { [rootClassName]: rootClassName !== '' }),
      input: classnames(classes.input, { [inputClassName]: inputClassName !== '' }),
      formControl: classes.inputFormControl,
      inkbar: classnames(classes.inkbar, { [inkbarClassName]: inkbarClassName !== '' }),
      underline: classnames(classes.underline, { [underlineClassName]: underlineClassName !== '' }),
    };

    const inputLabelClasses = {
      root: classnames(classes.label, { [labelRootClassName]: labelRootClassName !== '' }),
      shrink: classnames(classes.labelShrink, { [labelShrinkClassName]: labelShrinkClassName !== '' }),
    };

    const formControlClasses = {
      root: containerClassName,
      focused: classes.labelFocused,
    };

    const props = {
      id,
      disabled,
      onChange,
      placeholder,
      type,
      value,
      style: styles.inputFormControl,
      classes: customClasses,
    };

    if (adornment !== '') {
      const adornmentProp = adornmentPosition === 'start' ? 'startAdornment' : 'endAdornment';
      const adornmentClasses = {
        root: classnames(classes.adornmentRoot, { [adornmentRootClassName]: adornmentRootClassName !== '' }),
      };
      props[adornmentProp] = (
        <InputAdornment
          classes={ adornmentClasses }
          position={ adornmentPosition }
        >
          <div>{ adornment }</div>
        </InputAdornment>
      );
    }

    if (mask.length > 0) {
      props.inputComponent = CustomMaskedInput;
      props.inputProps = { mask };
    }

    const InputComponent = React.createElement(Input, props);

    return (
      <FormControl
        className={ className }
      >
        <InputLabel
          htmlFor={ id }
          FormControlClasses={ formControlClasses }
          shrink={ labelFixed }
          classes={ inputLabelClasses }
        >
          { label }
        </InputLabel>
        { InputComponent }
      </FormControl>
    );
  }
}

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;
export default injectSheet(styles)(TextField);
