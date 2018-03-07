import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  iconSrc: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  labelClassName: PropTypes.string,
};

const defaultProps = {
  className: '',
  labelClassName: '',
};

const styles = {
  main: {
    textAlign: 'center',
  },
  label: {
    fontSize: '12px',
    fontWeight: 'normal',
    color: colors.GRAY_XXDARK,
    marginTop: '10px',
  },
};


class LabeledIcon extends PureComponent {
  render() {
    const {
      className,
      classes,
      iconSrc,
      label,
      labelClassName,
    } = this.props;

    const mainClass = classnames(classes.main, {
      [className]: className !== '',
    });

    const labelClass = classnames(classes.label, {
      [labelClassName]: labelClassName !== '',
    });

    return (
      <div className={ mainClass }>
        <img
          alt=""
          src={ iconSrc }
          className={ classes.icon }
        />
        <div className={ labelClass }>{ label }</div>
      </div>
    );
  }
}

LabeledIcon.propTypes = propTypes;
LabeledIcon.defaultProps = defaultProps;
export default injectSheet(styles)(LabeledIcon);
