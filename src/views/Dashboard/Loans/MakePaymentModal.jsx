import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import Button from '../../shared/Button';
import Modal from '../../shared/Modal';
import CollectDepositOption from '../../shared/CollectDepositOption';
import LocationCard from '../../shared/LocationCard';

import iconCheckmark from '../../../../assets/img/icon-checkmark-white.svg';
import bdoLogo from '../../../../assets/img/bdo-logo.png';
import smLogo from '../../../../assets/img/sm-logo.png';


const propTypes = {
  classes: PropTypes.object.isRequired,
  onConfirmClick: PropTypes.func,
  onCloseClick: PropTypes.func.isRequired,
  loanId: PropTypes.string,
  show: PropTypes.bool,
};

const defaultProps = {
  loanId: '',
  show: false,
  onConfirmClick: () => {},
};

const styles = {
  modal: {
    padding: '40px',
  },
  pageContent: {
    textAlign: 'center',
  },
  card: {
    borderRadius: '8px',
    opacity: '0.5',
    transition: 'boxShadow 200ms, opacity 200ms',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
    '&:hover': {
      boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.25)',
    },
    '@media (min-width: 1400px)': {
      marginTop: '50px',
    },
    '@media (min-width: 992px)': {
      marginTop: '16px',
    },
  },
  activeCard: {
    borderRadius: '8px',
    opacity: '1',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.25)',
    '@media (min-width: 1400px)': {
      marginTop: '50px',
    },
    '@media (min-width: 992px)': {
      marginTop: '15px',
    },
  },
  cardMargin: {
    marginLeft: '20px',
  },
  locations: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    textAlign: 'center',
  },
  description: {
    maxWidth: '800px',
    marginTop: '2px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '18px',
    lineHeight: '26px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  bottom: {
    display: 'flex',
    width: '100%',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '35px',
    '@media (min-width: 1400px)': {
      marginTop: '77px',
    },
    '@media (min-width: 992px)': {
      marginTop: '40px',
    },
  },
  button: {
    display: 'flex',
    flexFlow: 'row nowrap',
    marginLeft: '15px',
    fontSize: '14px',
  },
  goBack: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  iconCheckmark: {
    marginLeft: '5px',
  },
};

const DEMO_LOCATIONS = [
  {
    name: 'Banco de Oro',
    img: bdoLogo,
  },
  {
    name: 'SM Currency Exchange',
    img: smLogo,
  },
  {
    name: 'SM Business Services',
    img: smLogo,
  },
];

const NUM_PAGES = 2;

class MakePaymentModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      page: 1,
      selectedLocationName: null,
    };

    this.onPageForward = this.onPageForward.bind(this);
    this.onPageBack = this.onPageBack.bind(this);
  }

  renderLocations() {
    const {
      classes,
    } = this.props;

    const {
      selectedLocationName,
    } = this.state;

    return DEMO_LOCATIONS.map(({ name, img }, index) => {
      const isActive = name === selectedLocationName;
      const cardClass = classnames(classes.card, {
        [classes.cardMargin]: index > 0,
        [classes.activeCard]: isActive,
      });

      return (
        <LocationCard
          key={ name }
          cardClassName={ cardClass }
          locationName={ name }
          img={ img }
          onClick={ () => this.setState({ selectedLocationName: name }) }
        />
      );
    });
  }

  onPageForward() {
    const { onConfirmClick } = this.props;
    const { page, selectedLocationName } = this.state;

    if (page === 1) {
      this.setState({ page: page + 1 });
    } else {
      onConfirmClick({ locationName: selectedLocationName });
    }
  }

  onPageBack() {
    const { onCloseClick } = this.props;
    const { page } = this.state;

    if (page === NUM_PAGES) {
      this.setState({ page: page - 1 });
    } else {
      onCloseClick();
    }
  }

  render() {
    const {
      classes,
      onCloseClick,
      show,
      loanId,
    } = this.props;

    const {
      page,
    } = this.state;

    let content;
    if (page === 1) {
      content = (
        <div>
          <div className={ classes.description }>How would you like to repay your loan?</div>
          <CollectDepositOption
            optionType="cashDeposit"
            cardClassName={ classes.activeCard }
          />
          <div className={ classes.bottom }>
            <div className={ classes.goBack } onClick={ this.onPageBack }>Go back</div>
            <Button
              buttonClassName={ classes.button }
              onClick={ this.onPageForward }
            >
              ConfirmSelection
              <img
                alt=""
                src={ iconCheckmark }
                className={ classes.iconCheckmark }
              />
            </Button>
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <div className={ classes.description }>
            To make a cash repayment, visit any of these stores and make a payment to One Daijo for Loan ID { loanId }
          </div>
          <div className={ classes.locations }>
            { this.renderLocations() }
          </div>
          <div className={ classes.bottom }>
            <div
              className={ classes.goBack }
              onClick={ this.onPageBack }
            >
              Go back
            </div>
            <Button
              buttonClassName={ classes.button }
              onClick={ this.onPageForward }
            >
              OK, got it
              <img
                alt=""
                src={ iconCheckmark }
                className={ classes.iconCheckmark }
              />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Modal
        show={ show }
        onCloseClick={ onCloseClick }
        modalClassName={ classes.modal }
      >
        <div className={ classes.title }>Make a Payment</div>
        { content }
      </Modal>
    );
  }
}


MakePaymentModal.propTypes = propTypes;
MakePaymentModal.defaultProps = defaultProps;
export default injectSheet(styles)(MakePaymentModal);
