import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';


const propTypes = {
  align: PropTypes.oneOf(['left', 'right']), // eslint-disable-line react/no-unused-prop-types
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const defaultProps = {
  align: 'left',
};

const styles = {
  title: {
    textAlign: ({ align }) => align,
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    color: 'rgba(0, 0, 0, 0.38)',
  },
  value: {
    textAlign: ({ align }) => align,
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
  },
};


class LoanInfo extends PureComponent {
  render() {
    const {
      classes,
      title,
      value,
    } = this.props;

    return (
      <div className={ classes.main }>
        <div className={ classes.title }>{ title }</div>
        <div className={ classes.value }>{ value }</div>
      </div>
    );
  }
}

LoanInfo.propTypes = propTypes;
LoanInfo.defaultProps = defaultProps;
export default injectSheet(styles)(LoanInfo);
