import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import Card from '../Card';


const propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  containerClassName: PropTypes.string,
};

const defaultProps = {
  containerClassName: '',
};

const styles = {
  stackContainer: {
    width: '650px',
    position: 'relative',
    zIndex: '1',
    display: 'flex',
    flexDirection: 'column',
    borderCollapse: 'separate',
  },
};


class Stack extends Component {
  renderChildren() {
    const { id, children } = this.props;
    const arrChildren = Array.isArray(children) ? children : [children];
    const numCards = arrChildren.length;
    return arrChildren.map((child, index) => React.cloneElement(child, {
      index,
      numCards,
      key: `${id}-${index}`, // eslint-disable-line react/no-array-index-key
      isLastIndex: index === (arrChildren.length - 1),
    }));
  }

  render() {
    const {
      classes,
      containerClassName,
    } = this.props;

    const stackContainerClass = classnames(classes.stackContainer, {
      [containerClassName]: containerClassName !== '',
    });

    return (
      <Card cardClassName={ stackContainerClass }>
        { this.renderChildren() }
      </Card>
    );
  }
}

Stack.propTypes = propTypes;
Stack.defaultProps = defaultProps;
export default injectSheet(styles)(Stack);
