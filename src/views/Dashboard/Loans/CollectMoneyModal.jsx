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
  onConfirmClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const defaultProps = {
  show: false,
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
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.15)',
    opacity: '0.5',
    marginRight: 'auto',
    marginLeft: 'auto',
    transition: 'box-shadow 200ms, opacity 200ms',
    '&:hover': {
      boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.25)',
    },
    '@media (min-width: 1400px)': {
      marginTop: '71px',
    },
    '@media (min-width: 992px)': {
      marginTop: '58px',
    },
  },
  activeCard: {
    borderRadius: '8px',
    opacity: '1',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.25)',
  },
  cardMargin: {
    marginLeft: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    textAlign: 'center',
  },
  locations: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  description: {
    marginTop: '2px',
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
    marginTop: '20px',
    '@media (min-width: 1400px)': {
      marginTop: '40px',
    },
    '@media (min-width: 992px)': {
      marginTop: '30px',
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

class CollectMoneyModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      page: 1,
      selectedLocationName: null,
    };
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

  render() {
    const {
      classes,
      onCloseClick,
      onConfirmClick,
      show,
    } = this.props;

    const {
      page,
      selectedLocationName,
    } = this.state;

    let content;
    if (page === 1) {
      content = (
        <div>
          <div className={ classes.description }>How would you like to receive your money?</div>
          <CollectDepositOption
            optionType="pickup"
            cardClassName={ classnames(classes.card, classes.activeCard) }
          />
          <div className={ classes.bottom }>
            <div className={ classes.goBack } onClick={ onCloseClick }>Go back</div>
            <Button
              buttonClassName={ classes.button }
              onClick={ () => this.setState({ page: page + 1 }) }
            >
              Confirm Selection
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
          <div className={ classes.description }>Where would you like to pick up your cash?</div>
          <div className={ classes.locations }>
            { this.renderLocations() }
          </div>
          <div className={ classes.bottom }>
            <div
              className={ classes.goBack }
              onClick={ () => this.setState({ page: page - 1 }) }
            >
              Go back
            </div>
            <Button
              buttonClassName={ classes.button }
              onClick={ () => onConfirmClick({ locationName: selectedLocationName }) }
            >
              Confirm Selection
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
        <div className={ classes.title }>Collect money</div>
        { content }
      </Modal>
    );
  }
}

CollectMoneyModal.propTypes = propTypes;
CollectMoneyModal.defaultProps = defaultProps;
export default injectSheet(styles)(CollectMoneyModal);
