import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
};

class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.main }>
        This is home.
      </div>
    );
  }
}

Index.propTypes = propTypes;
export default injectSheet(styles)(Index);
