import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  label: PropTypes.string.isRequired,
};

const defaultProps = {
  className: '',
};

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: '12px',
    lineHeight: '14px',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  value: {
    maxWidth: '100%',
    fontSize: '18px',
    lineHeight: '25px',
    marginTop: '2px',
    color: 'rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

class LabeledField extends PureComponent {
  render() {
    const {
      children,
      classes,
      className,
      label,
    } = this.props;

    const wrapperClass = classnames(classes.main, { [className]: className !== '' });

    return (
      <div className={ wrapperClass }>
        <div className={ classes.label }>{ label }</div>
        <div className={ classes.value }>{ children }</div>
      </div>
    );
  }
}

LabeledField.propTypes = propTypes;
LabeledField.defaultProps = defaultProps;
export default injectSheet(styles)(LabeledField);
