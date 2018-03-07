import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../../utils/colors';
import iconCheckmark from '../../../../assets/img/icon-checkmark-white.svg';
import iconCollapse from '../../../../assets/img/icon-collapse-up.svg';

const propTypes = {
  contentClassName: PropTypes.string,
  activeContentClassName: PropTypes.string,
  classes: PropTypes.object.isRequired,
  cardClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  isExpanded: PropTypes.bool,
  isCompleted: PropTypes.bool,
  id: PropTypes.string,
  index: PropTypes.number.isRequired,
  isLastIndex: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  message: PropTypes.string,
  numCards: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  onToggleExpanded: PropTypes.func,
  title: PropTypes.string.isRequired,
  zIndexStart: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
};

const defaultProps = {
  activeContentClassName: '',
  contentClassName: '',
  isExpanded: false,
  isCompleted: false,
  id: '',
  message: '',
  onToggleExpanded: () => {},
  cardClassName: '',
  zIndexStart: 1,
};


function deriveBorderWidth({ numCards, index }) {
  if (index === 0) {
    return '0px 1px 1px';
  } else if (index === numCards - 1) {
    return '1px 1px 0px';
  }

  return '1px';
}

const styles = {
  card: {
    display: 'inline-block',
    width: '100%',
    marginTop: ({ index }) => (index > 0 ? '-15px' : '0px'),
    zIndex: ({ index, zIndexStart }) => `${zIndexStart + index}`,
    borderRadius: '10px',
    borderWidth: ({ numCards, index }) => deriveBorderWidth({ numCards, index }),
    borderStyle: 'solid',
    borderColor: '#F0F0F0',
    backgroundColor: colors.WHITE,
    overflow: 'hidden',
  },
  activeCard: {
    zIndex: ({ index, zIndexStart, numCards }) => `${zIndexStart + numCards + index}`,
  },
  top: {
    width: '100%',
    paddingTop: '20px',
    paddingRight: '40px',
    paddingBottom: ({ isLastIndex }) => (isLastIndex ? '20px' : '30px'),
    paddingLeft: '40px',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'padding 200ms',
  },
  activeTop: {
    width: '100%',
    paddingTop: '40px',
    paddingRight: '40px',
    paddingBottom: '10px',
    paddingLeft: '40px',
  },
  bubble: {
    width: '20px',
    height: '20px',
    position: 'relative',
    fontSize: '12px',
    borderRadius: '50%',
    transition: 'width 200ms, height 200ms',
    backgroundColor: 'rgba(0, 42, 66, 0.5)',
    color: colors.WHITE,
  },
  activeBubble: {
    width: '24px',
    height: '24px',
    fontSize: '14px',
    backgroundColor: colors.BLUE,
  },
  bubbleContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-43%, -50%)',
    transition: 'width 200ms, height 400ms',
  },
  bubbleCompleted: {
    width: '7px',
    height: '6px',
  },
  bubbleActive: {
    width: '11px',
    height: '10px',
  },
  titleText: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgba(0, 42, 66, 0.5)',
    transition: 'font-size 200ms',
    marginLeft: '20px',
  },
  activeTitleText: {
    fontSize: '18px',
    color: colors.GRAY_XXXDARK,
    marginLeft: '22px',
  },
  topLeft: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  topRight: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topLeftText: {
    marginRight: '10px',
  },
  checkmark: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  content: {
    maxHeight: '0px',
    opacity: '0',
    transition: 'max-height 1500ms ease, opacity 200ms',
  },
  activeContent: {
    maxHeight: '1200px',
    opacity: '1',
  },
  collapseIcon: {
    transition: 'transform 200ms',
  },
  collapseIconActive: {
    transform: 'rotate(-180deg)',
  },
};

class StackCard extends Component {
  render() {
    const {
      activeContentClassName,
      contentClassName,
      children,
      classes,
      id,
      isCompleted,
      isExpanded,
      index,
      message,
      onToggleExpanded,
      title,
      cardClassName,
    } = this.props;

    const cardClass = classnames(classes.card, {
      [classes.activeCard]: isExpanded,
      [cardClassName]: cardClassName !== '',
    });

    const topClass = classnames(classes.top, {
      [classes.activeTop]: isExpanded,
    });

    const bubbleClass = classnames(classes.bubble, {
      [classes.activeBubble]: isExpanded,
    });

    const bubbleContentClass = classnames(classes.bubbleContent, {
      [classes.bubbleCompleted]: isCompleted,
      [classes.bubbleActive]: isCompleted && isExpanded,
    });

    const titleTextClass = classnames(classes.titleText, {
      [classes.activeTitleText]: isExpanded,
    });

    const collapseIconClass = classnames(classes.collapseIcon, {
      [classes.collapseIconActive]: isExpanded,
    });

    const contentClass = classnames(classes.content, {
      [classes.activeContent]: isExpanded,
      [contentClassName]: contentClassName !== '',
      [activeContentClassName]: isExpanded && activeContentClassName !== '',
    });


    let messageElement = null;
    if (message !== '') {
      messageElement = (
        <div className={ classnames(classes.topLeftText, titleTextClass) }>{ message }</div>
      );
    }

    let iconContent;
    if (isCompleted) {
      iconContent = (
        <img
          alt=""
          src={ iconCheckmark }
          className={ bubbleContentClass }
        />
      );
    } else {
      iconContent = <div className={ bubbleContentClass }>{ index + 1 }</div>;
    }

    const iconElement = (
      <div className={ bubbleClass }>
        { iconContent }
      </div>
    );

    const top = (
      <div
        className={ topClass }
        onClick={ onToggleExpanded }
      >
        <div className={ classes.topLeft }>
          { iconElement }
          <div className={ titleTextClass }>{ title }</div>
        </div>
        <div className={ classes.topRight }>
          { messageElement }
          <img
            alt=""
            src={ iconCollapse }
            className={ collapseIconClass }
          />
        </div>
      </div>
    );

    return (
      <div id={ id } className={ cardClass }>
        <div className={ classes.cardContent }>
          { top }
          <div className={ contentClass }>
            { isExpanded ? children : null }
          </div>
        </div>
      </div>
    );
  }
}

StackCard.propTypes = propTypes;
StackCard.defaultProps = defaultProps;
export default injectSheet(styles)(StackCard);
