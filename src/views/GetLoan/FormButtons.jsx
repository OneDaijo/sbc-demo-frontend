import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import Button from '../shared/Button';
import iconPaperAirplane from '../../../assets/img/icon-paper-airplane.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  buttonEnabled: PropTypes.bool,
  onGoBackClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  submit: PropTypes.bool,
};

const defaultProps = {
  className: '',
  buttonEnabled: false,
  onGoBackClick: () => {},
  onNextClick: () => {},
  onSubmitClick: () => {},
  submit: false,
};

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  goBack: {
    color: '#000000',
    opacity: '.54',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  button: {
    marginLeft: '15px',
    paddingTop: '16px',
    paddingRight: '36px',
    paddingBottom: '15px',
    paddingLeft: '35px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color .25s',
  },
  buttonContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: '5px',
  },
};


class FormButtons extends PureComponent {
  render() {
    const {
      classes,
      className,
      onGoBackClick,
      onNextClick,
      onSubmitClick,
      buttonEnabled,
      submit,
    } = this.props;

    const containerClass = classnames(classes.main, { [className]: className !== '' });

    let buttonContent;
    if (submit) {
      buttonContent = (
        <div className={ classes.buttonContent }>
          Submit Application
          <img
            alt=""
            src={ iconPaperAirplane }
            className={ classes.icon }
          />
        </div>
      );
    } else {
      buttonContent = (
        <div>Next</div>
      );
    }

    return (
      <div className={ containerClass }>
        <div className={ classes.goBack } onClick={ onGoBackClick }>Go Back</div>
        <Button
          active={ buttonEnabled }
          buttonClassName={ classes.button }
          onClick={ submit ? onSubmitClick : onNextClick }
        >
          { buttonContent }
        </Button>
      </div>
    );
  }
}


FormButtons.propTypes = propTypes;
FormButtons.defaultProps = defaultProps;
export default injectSheet(styles)(FormButtons);
