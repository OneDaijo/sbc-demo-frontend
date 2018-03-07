import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import Card from '../shared/Card';


const propTypes = {
  cardClassName: PropTypes.string,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

const defaultProps = {
  cardClassName: '',
  children: null,
};

const styles = {
  card: {
    position: 'relative',
    width: '540px',
    zIndex: '5',
    paddingTop: '50px',
    paddingRight: '60px',
    paddingBottom: '50px',
    paddingLeft: '60px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};


class FormCard extends PureComponent {
  render() {
    const {
      cardClassName,
      classes,
      children,
    } = this.props;

    const cardClass = classnames(classes.card, {
      [cardClassName]: cardClassName !== '',
    });

    return (
      <Card cardClassName={ cardClass }>
        { children }
      </Card>
    );
  }
}

FormCard.propTypes = propTypes;
FormCard.defaultProps = defaultProps;
export default injectSheet(styles)(FormCard);
