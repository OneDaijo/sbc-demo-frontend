import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Card from '../../shared/Card';

import colors from '../../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  borrowerName: PropTypes.string.isRequired,
};

const styles = {
  card: {
    marginTop: '55px',
    backgroundColor: colors.BLUE,
    borderRadius: '10px',
    padding: '40px 100px 35px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '600px',
  },
  title: {
    color: colors.WHITE,
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
    textAlign: 'center',
  },
  body: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    marginTop: '19px',
    textAlign: 'left',
  },
  dismiss: {
    extend: 'body',
    textDecoration: 'underline',
    textAlign: 'center',
    marginTop: '20px',
    cursor: 'pointer',
  },
};

class FirstTimeLanding extends PureComponent {
  constructor() {
    super();
    this.state = {
      show: true,
    };
    this.hide = this.hide.bind(this);
  }

  hide() {
    this.setState({ show: false });
  }

  render() {
    const {
      classes,
      borrowerName,
    } = this.props;

    const { show } = this.state;
    if (show === false) {
      return null;
    }

    return (
      <Card cardClassName={ classes.card }>
        <div className={ classes.title }>Welcome, { borrowerName }</div>
        <div className={ classes.body }>
          Congratulations on applying for your first loan! We’re thrilled to have
          you in the OneDaijo family.
          <br />
          <br />
          Below you’ll find your loan, and its current
          state in the process. We’ll walk you through every step of the way to
          getting you funded. Feel free to send us a message if you have any questions!
        </div>
        <div className={ classes.dismiss } onClick={ this.hide }>Dismiss</div>
      </Card>
    );
  }
}

FirstTimeLanding.propTypes = propTypes;
export default injectSheet(styles)(FirstTimeLanding);
