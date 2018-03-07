import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { LinearProgress } from 'material-ui/Progress';

import StackCard from '../../shared/Stack/StackCard';
import Button from '../../shared/Button';
import LabeledIcon from '../../shared/LabeledIcon';

import colors from '../../../utils/colors';

import iconPopoutActive from '../../../../assets/img/icon-popout-white.svg';
import iconPopoutInactive from '../../../../assets/img/icon-popout-gray.svg';
import iconDownloadActive from '../../../../assets/img/icon-download-arrow-white.svg';
import iconDownloadInactive from '../../../../assets/img/icon-download-arrow-gray.svg';
import iconDriversLicence from '../../../../assets/img/icon-drivers-licence.svg';
import iconPostalId from '../../../../assets/img/icon-postal-id.svg';
import iconPassport from '../../../../assets/img/icon-passport.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  fundsOptionsReady: PropTypes.bool,
  loanPickupLocation: PropTypes.object,
  isReadyForPickup: PropTypes.bool,
  borrowerName: PropTypes.string.isRequired,
  onChooseFundingClick: PropTypes.func,
  onContinueClick: PropTypes.func,
};

const defaultProps = {
  fundsOptionsReady: false,
  loanPickupLocation: {},
  isReadyForPickup: false,
  onChooseFundingClick: () => {},
  onContinueClick: () => {},
};


function isButtonActive({ isReadyForPickup, fundsOptionsReady, loanPickupLocation }) {
  return isReadyForPickup || (loanPickupLocation.locationName === undefined && fundsOptionsReady);
}

const styles = {
  paddedContent: {
    width: '100%',
    padding: '10px 40px 40px',
  },
  columnContent: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    textAlign: 'center',
    fontSize: '18px',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  extraMarginTitle: {
    extend: 'status',
    maxWidth: '400px',
    display: 'inline-block',
    marginTop: '115px',
  },
  centeredGroup: {
    textAlign: 'center',
  },
  progressBarRoot: {
    marginTop: '10px',
    height: '6px',
    width: '260px',
  },
  progressBarTrackColor: {
    backgroundColor: colors.GRAY_LIGHT,
  },
  progressBarColor: {
    backgroundColor: colors.BLUE,
  },
  eta: {
    fontSize: '18px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: 'auto',
  },
  body: {
    marginTop: '40px',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  completedBody: {
    marginTop: '5px',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  cardBottom: {
    marginTop: '66px',
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    paddingTop: '14px',
    paddingRight: '33px',
    paddingBottom: '15px',
    paddingLeft: '38px',
    marginLeft: '15px',
  },
  buttonContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: '500',
    color: props => (isButtonActive(props) ? colors.WHITE : colors.GRAY_DARK),
  },
  buttonIcon: {
    marginLeft: '5px',
  },
  passportLabel: {
    maxWidth: '95px',
  },
  idForms: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '21px',
  },
  labeledIconWithMargin: {
    marginLeft: '20px',
  },
  mapCard: {
    marginTop: '30px',
  },
};

class GetFunds extends PureComponent {
  render() {
    const {
      classes,
      isReadyForPickup,
      borrowerName,
      fundsOptionsReady,
      loanPickupLocation,
      onChooseFundingClick,
      onContinueClick,
      ...rest
    } = this.props;

    const progressClasses = {
      root: classes.progressBarRoot,
      primaryColor: classes.progressBarTrackColor,
      primaryColorBar: classes.progressBarColor,
    };

    const locationName = loanPickupLocation.locationName;
    const pickupLocationSelected = locationName !== undefined;

    let button;
    let content;
    if (!pickupLocationSelected) {
      button = (
        <Button
          buttonClassName={ classes.button }
          onClick={ onChooseFundingClick }
          active={ fundsOptionsReady }
        >
          <span className={ classes.buttonText }>Collect money</span>
          <img
            alt=""
            src={ fundsOptionsReady ? iconPopoutActive : iconPopoutInactive }
            className={ classes.buttonIcon }
          />
        </Button>
      );

      if (fundsOptionsReady) {
        content = (
          <div className={ classes.columnContent }>
            <div className={ classes.centeredGroup }>
              <div className={ classes.extraMarginTitle }>Your loan is officially funded!</div>
              <div className={ classes.completedBody }>
                Congratulations, { borrowerName }. You can collect your money via bank transfer or cash pickup at one our partner stores.
              </div>
            </div>
          </div>
        );
      } else {
        content = (
          <div className={ classes.columnContent }>
            <div className={ classes.status }>A lender is preparing to fund your loan.</div>
            <LinearProgress
              classes={ progressClasses }
              mode="indeterminate"
            />
            <div className={ classes.body }>
              Sit tight, this usually takes 10 to 15 minutes.
            </div>
          </div>
        );
      }
    } else {
      button = (
        <Button
          buttonClassName={ classes.button }
          onClick={ onContinueClick }
          active={ isReadyForPickup }
        >
          <span className={ classes.buttonText }>Continue to repayment</span>
          <img
            alt=""
            src={ isReadyForPickup ? iconDownloadActive : iconDownloadInactive }
            className={ classes.buttonIcon }
          />
        </Button>
      );

      if (isReadyForPickup) {
        content = (
          <div className={ classes.columnContent }>
            <div className={ classes.status }>Your money is ready to be picked up!</div>
            <div className={ classes.body }>Please visit any { locationName } location with any two forms of government ID shown below.</div>
            <div className={ classes.idForms }>
              <LabeledIcon
                label="Driver's Licence"
                iconSrc={ iconDriversLicence }
                className={ classes.labeledIcon }
              />
              <LabeledIcon
                label="Postal ID"
                iconSrc={ iconPostalId }
                className={ classes.labeledIconWithMargin }
              />
              <LabeledIcon
                label="Passports Local and Foreign"
                iconSrc={ iconPassport }
                labelClassName={ classes.passportLabel }
                className={ classes.labeledIconWithMargin }
              />
            </div>
          </div>
        );
      } else {
        content = (
          <div className={ classes.columnContent }>
            <div className={ classes.extraMarginTitle }>Your money is being prepared for cash pickup at { locationName } locations.</div>
            <LinearProgress
              classes={ progressClasses }
              mode="indeterminate"
            />
            <div className={ classes.body }>
              We’ll let you know when it’s ready.&nbsp;
              Cash pickup fulfillments typically take six (6) hours, but can take up to one (1) business day.
            </div>
          </div>
        );
      }
    }

    let eta;
    if (fundsOptionsReady) {
      eta = <div className={ classes.eta }>Funds arrive within 15 min</div>;
    } else if (isReadyForPickup) {
      eta = <div className={ classes.eta }>Arrives within 1 business day</div>;
    }

    const cardBottomContent = (
      <div className={ classes.cardBottom }>
        { eta }
        { button }
      </div>
    );

    return (
      <StackCard
        title="Get Funds"
        isCompleted={ isReadyForPickup }
        { ...rest }
      >
        <div className={ classes.paddedContent }>
          { content }
          { cardBottomContent }
        </div>
      </StackCard>
    );
  }
}

GetFunds.propTypes = propTypes;
GetFunds.defaultProps = defaultProps;
export default injectSheet(styles)(GetFunds);
