import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FormCard from './FormCard';

import colors from '../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  isInitiallyVisible: PropTypes.bool,
  onDismissClick: PropTypes.func,
};

const defaultProps = {
  isInitiallyVisible: true,
  onDismissClick: () => {},
};

const styles = {
  card: {
    backgroundColor: colors.BLUE,
  },
  title: {
    fontSize: '24px',
    lineHeight: '39px',
    color: colors.WHITE,
  },
  body: {
    maxWidth: '420px',
    fontSize: '14px',
    fontWeight: '500',
    color: colors.WHITE,
    opacity: '0.7',
    marginTop: '10px',
    textAlign: 'center',
    lineHeight: '21px',
  },
  emoji: {
    opacity: '1',
  },
  dismiss: {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.WHITE,
    opacity: '0.7',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginTop: '30px',
  },
};


class ThirdQuestion extends Component {
  constructor(props) {
    super();
    this.state = {
      show: props.isInitiallyVisible,
    };
    this.onDismissClick = this.onDismissClick.bind(this);
  }

  onDismissClick() {
    const { onDismissClick } = this.props;
    this.setState({ show: false });
    onDismissClick();
  }

  render() {
    const {
      classes,
      email,
      firstName,
    } = this.props;

    const {
      show,
    } = this.state;

    if (!show) {
      return null;
    }

    return (
      <FormCard cardClassName={ classes.card }>
        <div className={ classes.title }>Confirm email address</div>
        <div className={ classes.body }>
          Hi, { firstName }! <span className={ classes.emoji }>👋</span> It&apos;s nice to meet you.
          We&apos;ve sent an email to { email }.
          Please click the link inside to verify your email address!&nbsp;
          <b>You must verify your email before you may continue.</b>
        </div>
        <div
          className={ classes.dismiss }
          onClick={ this.onDismissClick }
        >
          Dismiss
        </div>
      </FormCard>
    );
  }
}

ThirdQuestion.propTypes = propTypes;
ThirdQuestion.defaultProps = defaultProps;
export default injectSheet(styles)(ThirdQuestion);

