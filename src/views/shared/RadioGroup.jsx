import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup as MuiRadioGroup } from 'material-ui/Radio';
import { FormControl } from 'material-ui/Form';

const propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  id: '',
  children: null,
  onChange: () => {},
  value: '',
  className: '',
};


class RadioSelect extends Component {
  render() {
    const {
      className,
      children,
      id,
      name,
      onChange,
      value,
    } = this.props;

    return (
      <FormControl component="fieldset">
        <MuiRadioGroup
          id={ id }
          className={ className }
          name={ name }
          value={ value }
          onChange={ onChange }
        >
          { children }
        </MuiRadioGroup>
      </FormControl>
    );
  }
}

RadioSelect.propTypes = propTypes;
RadioSelect.defaultProps = defaultProps;
export default RadioSelect;
