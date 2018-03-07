import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { LinearProgress } from 'material-ui/Progress';

import StackCard from '../../shared/Stack/StackCard';
import Button from '../../shared/Button';

import colors from '../../../utils/colors';

import iconDownloadArrowActive from '../../../../assets/img/icon-download-arrow-white.svg';
import iconDownloadArrowInactive from '../../../../assets/img/icon-download-arrow-gray.svg';

const propTypes = {
  classes: PropTypes.object.isRequired,
  isCompleted: PropTypes.bool,
  onClick: PropTypes.func,
};

const defaultProps = {
  isCompleted: false,
  onClick: () => {},
};

const styles = {
  paddedContent: {
    width: '100%',
    padding: '10px 40px 40px',
    textAlign: 'center',
  },
  columnContent: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanAppStatus: {
    display: 'inline-block',
    fontSize: '18px',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  approved: {
    display: 'inline-block',
    marginTop: '115px',
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '30px',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  progressBarRoot: {
    display: 'inline-block',
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
  hangTight: {
    marginTop: '40px',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '21px',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  cardBottom: {
    marginTop: ({ isCompleted }) => (isCompleted ? '94px' : '76px'),
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
  },
  buttonContent: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: '500',
    color: ({ isCompleted }) => (isCompleted ? colors.WHITE : colors.GRAY_DARK),
  },
  buttonIcon: {
    marginLeft: '5px',
  },
};

class Apply extends PureComponent {
  render() {
    const {
      classes,
      isCompleted,
      onClick,
      ...rest
    } = this.props;

    const progressClasses = {
      root: classes.progressBarRoot,
      primaryColor: classes.progressBarTrackColor,
      primaryColorBar: classes.progressBarColor,
    };

    let content;
    if (isCompleted === false) {
      content = (
        <div className={ classes.columnContent }>
          <div className={ classes.loanAppStatus }>Your application is on its way.</div>
          <LinearProgress
            classes={ progressClasses }
            mode="indeterminate"
          />
          <div className={ classes.hangTight }>
            Hang tight while we verify your identity. The process can take up to one business day—we’ll let you know when it’s finished.
          </div>
        </div>
      );
    } else {
      content = (
        <div className={ classes.approved }>Your application has been approved</div>
      );
    }

    const cardBottomContent = (
      <div className={ classes.cardBottom }>
        {
          !isCompleted && (
            <div className={ classes.eta }>Decision within 1 business day</div>
          )
        }
        <Button
          buttonClassName={ classes.button }
          active={ isCompleted }
          onClick={ onClick }
        >
          <div className={ classes.buttonContent }>
            <div className={ classes.buttonText }>Continue to offers</div>
            <img
              alt=""
              src={ isCompleted ? iconDownloadArrowActive : iconDownloadArrowInactive }
              className={ classes.buttonIcon }
            />
          </div>
        </Button>
      </div>
    );

    return (
      <StackCard
        title="Apply"
        isCompleted={ isCompleted }
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

Apply.propTypes = propTypes;
Apply.defaultProps = defaultProps;
export default injectSheet(styles)(Apply);
