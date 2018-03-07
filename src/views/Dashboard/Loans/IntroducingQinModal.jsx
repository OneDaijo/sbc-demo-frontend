import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Modal from '../../shared/Modal';
import Button from '../../shared/Button';
import QinCard from '../../shared/QinCard';

import colors from '../../../utils/colors';

import qinLogo from '../../../../assets/img/icon-qin-blue.svg';
import arrowIcon from '../../../../assets/img/icon-arrow-right-white.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  onConfirmClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  onModalClick: PropTypes.func,
  show: PropTypes.bool,
};

const defaultProps = {
  onConfirmClick: () => {},
  onCloseClick: () => {},
  onModalClick: () => {},
  show: false,
};

const styles = {
  modal: {
    padding: '40px',
  },
  pageContent: {
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '39px',
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    textAlign: 'center',
  },
  pageNumber: {
    marginTop: '2px',
    fontSize: '18px',
    lineHeight: '26px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  qinLogo: {
    marginTop: '40px',
    width: '135px',
    height: '135px',
    '@media (min-width: 1400px)': {
      marginTop: '85px',
    },
    '@media (min-width: 992px)': {
      marginTop: '60px',
    },
  },
  qinCard: {
    marginTop: '25px',
    display: 'inline-block',
    '@media (min-width: 1400px)': {
      marginTop: '53px',
    },
    '@media (min-width: 992px)': {
      marginTop: '35px',
    },
  },
  firstPageBody: {
    maxWidth: '450px',
    marginTop: '46px',
    fontSize: '14px',
    lineHeight: '26px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    '@media (min-width: 1400px)': {
      maxWidth: '400px',
      fontSize: '18px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '425px',
      fontSize: '16px',
    },
  },
  secondPageBody: {
    maxWidth: '500px',
    marginTop: '30px',
    fontSize: '14px',
    lineHeight: '26px',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.54)',
    '@media (min-width: 1400px)': {
      maxWidth: '400px',
      fontSize: '18px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '450px',
      fontSize: '16px',
    },
  },
  bottom: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '30px',
    '@media (min-width: 1400px)': {
      marginTop: '60px',
    },
    '@media (min-width: 992px)': {
      marginTop: '45px',
    },
  },
  goBack: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.54)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  button: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    fontSize: '14px',
    paddingTop: '16px',
    paddingRight: '30px',
    paddingBottom: '15px',
    paddingLeft: '30px',
    marginLeft: '15px',
  },
  buttonText: {
    color: colors.WHITE,
  },
  arrowIcon: {
    marginLeft: '5px',
  },
};


const TOTAL_PAGES = 2;

class IntroducingQinModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      pageNumber: 1,
    };

    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  goBack() {
    const { onCloseClick } = this.props;
    const { pageNumber } = this.state;
    if (pageNumber === 1) {
      onCloseClick();
    }

    this.setState({ pageNumber: Math.max(1, pageNumber - 1) });
  }

  goForward() {
    const { onConfirmClick } = this.props;
    const { pageNumber } = this.state;
    if (pageNumber === TOTAL_PAGES) {
      onConfirmClick();
    }

    this.setState({ pageNumber: Math.min(TOTAL_PAGES, pageNumber + 1) });
  }

  render() {
    const {
      classes,
      onCloseClick,
      onModalClick,
      show,
    } = this.props;

    const {
      pageNumber,
    } = this.state;

    let button;
    let content;
    if (pageNumber === 1) {
      button = (
        <Button
          buttonClassName={ classes.button }
          onClick={ this.goForward }
        >
          <div className={ classes.buttonText }>Next</div>
          <img
            className={ classes.arrowIcon }
            src={ arrowIcon }
            alt=""
          />
        </Button>
      );

      content = (
        <div className={ classes.pageContent }>
          <img
            alt="qin logo"
            className={ classes.qinLogo }
            src={ qinLogo }
          />
          <div className={ classes.firstPageBody }>
            QIN tokens are used as a measure of your creditworthiness.&nbsp;
            The more QIN you have, the more money you are able to request to loan in the future.
          </div>
        </div>
      );
    } else {
      button = (
        <Button
          buttonClassName={ classes.button }
          onClick={ this.goForward }
        >
          <div className={ classes.buttonText }>OK, got it. Continue to offers</div>
          <img
            className={ classes.arrowIcon }
            src={ arrowIcon }
            alt=""
          />
        </Button>
      );

      content = (
        <div className={ classes.pageContent }>
          <QinCard cardClassName={ classes.qinCard } qinAmount={ 18 } />
          <div className={ classes.secondPageBody }>
            When you repay your loans on time, you get awarded QIN tokens.&nbsp;
            Some loan options will award more QIN tokens for repayment, so keep that in mind when choosing your loan.
          </div>
        </div>
      );
    }

    const bottomContent = (
      <div className={ classes.bottom }>
        <div className={ classes.goBack } onClick={ this.goBack }>Go back</div>
        { button }
      </div>
    );

    return (
      <Modal
        show={ show }
        onModalClick={ onModalClick }
        onCloseClick={ onCloseClick }
        modalClassName={ classes.modal }
      >
        <div className={ classes.title }>Introducing QIN Tokens</div>
        <div className={ classes.pageNumber }>({ pageNumber } of { TOTAL_PAGES })</div>
        { content }
        { bottomContent }
      </Modal>
    );
  }
}

IntroducingQinModal.propTypes = propTypes;
IntroducingQinModal.defaultProps = defaultProps;
export default injectSheet(styles)(IntroducingQinModal);
