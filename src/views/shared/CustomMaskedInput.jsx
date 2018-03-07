import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';


const propTypes = {
  mask: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  placeholderChar: PropTypes.string,
};

const defaultProps = {
  placeholderChar: '\u2000',
};

class CustomMaskedInput extends Component {
  render() {
    const {
      mask,
      placeholderChar,
    } = this.props;

    return (
      <MaskedInput
        { ...this.props }
        mask={ mask }
        placeholderChar={ placeholderChar }
        placeholder="MM / DD / YYYY"
      />
    );
  }
}

CustomMaskedInput.propTypes = propTypes;
CustomMaskedInput.defaultProps = defaultProps;
export default CustomMaskedInput;
