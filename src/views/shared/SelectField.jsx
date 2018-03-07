import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

import colors from '../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  containerClassName: PropTypes.string,
  disabled: PropTypes.bool,
  MenuProps: PropTypes.object,
  id: PropTypes.string.isRequired,
  inkbarClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.string,
  labelFixed: PropTypes.bool,
  labelFocusClassName: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  rootClassName: PropTypes.string,
  underlineClassName: PropTypes.string,
  value: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
  containerClassName: '',
  disabled: false,
  MenuProps: {},
  inkbarClassName: '',
  inputClassName: '',
  label: '',
  labelFixed: false,
  labelFocusClassName: '',
  onChange: () => {},
  options: [],
  placeholder: '',
  rootClassName: '',
  underlineClassName: '',
  value: '',
};

const styles = {
  main: {
    color: '#00364D',
    fontSize: '36px',
  },
  floatingLabel: {
    fontSize: '18px',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  floatingLabelShrink: {
    fontSize: '12px',
  },
  formControlFocus: {
    color: '#0086BF',
  },
  icon: {
    top: '15px',
    right: '-17px',
  },
  input: {
    fontSize: '18px',
    color: 'rgba(0, 0, 0, 0.7)',
    '&:placeholder': {
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

function renderMenuItems(options, id, placeholder) {
  const menuItems = options.map(option => (
    <MenuItem
      key={ `SelectField:MenuItem:${option.value}` }
      id={ `SelectField:MenuItem:${option.value}` }
      value={ `${option.value}` }
    >
      { option.name }
    </MenuItem>
  ));

  menuItems.unshift(
    <MenuItem
      key={ `SelectField:MenuItem:${id}:default` }
      id={ `SelectField:MenuItem:${id}:default` }
      value=""
    >
      { placeholder }
    </MenuItem>
  );

  return menuItems;
}

class SelectField extends PureComponent {
  render() {
    const {
      classes,
      className,
      children,
      containerClassName,
      disabled,
      id,
      inkbarClassName,
      inputClassName,
      label,
      labelFixed,
      labelFocusClassName,
      MenuProps,
      onChange,
      options,
      placeholder,
      rootClassName,
      value,
      underlineClassName,
    } = this.props;

    const renderAsChildren = children !== null ? children : renderMenuItems(options, id, placeholder);

    const inputClasses = {
      input: classnames(classes.input, { [inputClassName]: inputClassName !== '' }),
      inkbar: classnames(classes.inkbar, { [inkbarClassName]: inkbarClassName !== '' }),
      underline: classnames(classes.underline, { [underlineClassName]: underlineClassName !== '' }),
    };

    const customClasses = {
      root: classnames(classes.root, { [rootClassName]: rootClassName !== '' }),
    };

    const formControlClasses = {
      root: containerClassName,
      focused: classnames(classes.formControlFocus, { [labelFocusClassName]: labelFocusClassName !== '' }),
    };

    const InputElement = (
      <Input
        id={ id }
        classes={ inputClasses }
        type="select"
      />
    );

    return (
      <FormControl className={ className }>
        <InputLabel
          htmlFor={ id }
          shrink={ labelFixed }
          FormControlClasses={ formControlClasses }
        >
          { label }
        </InputLabel>
        <Select
          className={ className }
          disabled={ disabled }
          input={ InputElement }
          onChange={ onChange }
          value={ value }
          classes={ customClasses }
          MenuProps={ MenuProps }
          displayEmpty={ placeholder !== '' }
        >
          { renderAsChildren }
        </Select>
      </FormControl>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
export default injectSheet(styles)(SelectField);
