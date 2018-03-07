import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Button from '../../shared/Button';

import imgMountains from '../../../../assets/img/mountains-backdrop.png';

const propTypes = {
  classes: PropTypes.object.isRequired,
  borrowerName: PropTypes.string,
};

const defaultProps = {
  borrowerName: '',
};

const styles = {
  main: {
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'normal',
    lineHeight: '39px',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: '30px',
  },
  body: {
    maxWidth: '500px',
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '25px',
    color: 'rgba(0, 0, 0, 0.54)',
    marginTop: '5px',
  },
  buttonContainer: {
    marginTop: '40px',
  },
  button: {
    paddingTop: '16px',
    paddingRight: '28px',
    paddingBottom: '15px',
    paddingLeft: '27px',
  },
};


class NoLoans extends PureComponent {
  render() {
    const {
      classes,
      borrowerName,
    } = this.props;

    return (
      <div className={ classes.main }>
        <div className={ classes.imgContainer }>
          <img
            className={ classes.topImg }
            src={ imgMountains }
            alt=""
          />
        </div>
        <div className={ classes.title }>
          { borrowerName.trim() }, you&apos;ve closed out all of your loans!
        </div>
        <div className={ classes.body }>
          With your new QIN rewards, you can borrow more money on your next loan.  Reach new heights with QIN!
        </div>
        <NavLink className={ classes.buttonContainer } to="/borrowers">
          <Button buttonClassName={ classes.button } active>+ Apply for a New Loan</Button>
        </NavLink>
      </div>
    );
  }
}

NoLoans.propTypes = propTypes;
NoLoans.defaultProps = defaultProps;
export default injectSheet(styles)(NoLoans);
