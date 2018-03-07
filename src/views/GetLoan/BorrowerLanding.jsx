import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import numeral from 'numeral';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import SignupHeader from './BorrowerLandingHeader';
import Button from '../shared/Button';
import Card from '../shared/Card';
import TextField from '../shared/TextField';
import colors from '../../utils/colors';

const propTypes = {
  loanAmount: PropTypes.number.isRequired,
  minLoanAmount: PropTypes.number.isRequired,
  maxLoanAmount: PropTypes.number.isRequired,
  onLoanAmountChange: PropTypes.func.isRequired,
  onGetLoanClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const GRADIENT_BACKGROUND = 'linear-gradient(180deg, #454545 0%, #FFFFFF 100%)';

const styles = {
  main: {
    minHeight: '100vh',
    height: 'auto',
    backgroundColor: '#0086BF',
    position: 'relative',
    '@media (min-width: 1200px)': {
      minHeight: '100vh',
      height: 'auto',
    },
  },
  gradientContainer: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
  },
  gradientOne: {
    background: GRADIENT_BACKGROUND,
    width: '120%',
    height: '160%',
    opacity: '0.2',
    position: 'absolute',
    overflow: 'hidden',
    top: '40%',
    left: '-34px',
    transform: 'rotate(20deg)',
  },
  columnContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    height: 'auto',
    margin: 'auto',
    padding: '60px 0px 50px',
  },
  header: {
    color: colors.WHITE,
    fontSize: '48px',
    fontWeight: '500',
  },
  subHeader: {
    color: colors.WHITE,
    opacity: '0.5',
    fontSize: '24px',
    lineHeight: '35px',
    marginTop: '15px',
  },
  button: {
    backgroundColor: '#0086BF',
    color: colors.WHITE,
    fontSize: '14px',
    fontWeight: '500',
    paddingTop: '16px',
    paddingRight: '32px',
    paddingBottom: '15px',
    paddingLeft: '34px',
    borderWidth: '0px',
    marginTop: '30px',
  },
  card: {
    position: 'relative',
    zIndex: '5',
    borderRadius: '15px',
    marginTop: '40px',
    paddingTop: '50px',
    paddingRight: '60px',
    paddingBottom: '50px',
    paddingLeft: '60px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.25)',
  },
  cardHeader: {
    fontSize: '24px',
  },
  textField: {
    width: '173px',
    marginTop: '50px',
  },
  textFieldInput: {
    fontSize: '36px',
    fontWeight: 'normal',
    color: '#00364d',
  },
  textFieldLabel: {
    color: 'rgba(0, 54, 77, 0.5)',
  },
  textFieldLabelShrink: {
    fontSize: '18px',
    fontWeight: 'normal',
  },
  textFieldAdornment: {
    fontSize: '36px',
  },
  sliderContainer: {
    width: '100%',
    marginTop: '40px',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  sliderLabels: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  sliderLabel: {
    fontSize: '14px',
    color: '#001D26',
    opacity: '0.5',
  },
  slider: {
    handle: {
      backgroundColor: '#0086bf',
      height: '20px',
      width: '20px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '0px',
      top: '6px',
    },
    rail: {
      backgroundColor: '#EDEDED',
      borderRadius: '100px',
      height: '12px',
    },
    track: {
      backgroundColor: '#0086BF',
      borderRadius: '100px',
      height: '12px',
    },
  },
};

const CURRENCY = 'PHP';

class BorrowerLanding extends Component {
  render() {
    const {
      classes,
      loanAmount,
      minLoanAmount,
      maxLoanAmount,
      onLoanAmountChange,
      onGetLoanClick,
    } = this.props;

    return (
      <div className={ classes.main }>
        <SignupHeader />
        <div className={ classes.columnContent }>
          <div className={ classes.header }>
            Loans designed for you.
          </div>
          <div className={ classes.subHeader }>
            Get affordable and transparent loans to build your credit history.
          </div>
          <Card cardClassName={ classes.card }>
            <div className={ classes.cardHeader }>How much would you like to borrow?</div>
            <div className={ classes.inputGroup }>
              <TextField
                id="BorrowerLanding:loanAmount"
                label="Loan amount"
                value={ numeral(loanAmount || minLoanAmount).format('0,0') }
                adornment={ CURRENCY }
                adornmentPosition="end"
                className={ classes.textField }
                inputClassName={ classes.textFieldInput }
                labelRootClassName={ classes.textFieldLabel }
                labelShrinkClassName={ classes.textFieldLabelShrink }
                adornmentRootClassName={ classes.textFieldAdornment }
                disabled
                labelFixed
              />
            </div>
            <div className={ classes.sliderContainer }>
              <Slider
                id="BorrowerLanding:Slider"
                min={ minLoanAmount }
                max={ maxLoanAmount }
                value={ loanAmount }
                onChange={ onLoanAmountChange }
                step={ 5 }
                handleStyle={ styles.slider.handle }
                railStyle={ styles.slider.rail }
                trackStyle={ styles.slider.track }
              />
              <div className={ classes.sliderLabels }>
                <div className={ classes.sliderLabel }>{ numeral(minLoanAmount).format('0,0') } { CURRENCY }</div>
                <div className={ classes.sliderLabel }>{ numeral(maxLoanAmount).format('0,0') } { CURRENCY }</div>
              </div>
            </div>
            <Button
              buttonClassName={ classes.button }
              onClick={ onGetLoanClick }
            >
              Get Your Loan
            </Button>
          </Card>
        </div>
      </div>
    );
  }
}

BorrowerLanding.propTypes = propTypes;
export default injectSheet(styles)(BorrowerLanding);
