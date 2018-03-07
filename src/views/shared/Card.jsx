import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import colors from '../../utils/colors';


const propTypes = {
  classes: PropTypes.object.isRequired,
  cardClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onClick: PropTypes.func,
};

const defaultProps = {
  cardClassName: '',
  children: null,
  onClick: () => {},
};

const styles = {
  card: {
    borderRadius: '8px',
    backgroundColor: colors.WHITE,
    boxShadow: '0px 10px 50px rgba(0, 0, 0, 0.25)',
  },
};

class Card extends PureComponent {
  render() {
    const {
      cardClassName,
      children,
      classes,
      onClick,
    } = this.props;

    const cardClass = classnames(classes.card, {
      [cardClassName]: cardClassName !== '',
    });

    return (
      <div
        className={ cardClass }
        onClick={ onClick }
      >
        { children }
      </div>
    );
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;
export default injectSheet(styles)(Card);
