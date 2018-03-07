import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import Card from './Card';

const propTypes = {
  cardClassName: PropTypes.string,
  classes: PropTypes.object.isRequired,
  img: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  cardClassName: '',
  onClick: () => {},
};

const styles = {
  card: {
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
    paddingTop: '30px',
    paddingRight: '30px',
    paddingBottom: '30px',
    paddingLeft: '30px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  },
  imgContainer: {
    width: '155px',
    height: '155px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  locationName: {
    marginTop: '75px',
    fontSize: '18px',
    fontWeight: '500',
  },
};

class LocationCard extends PureComponent {
  render() {
    const {
      cardClassName,
      classes,
      img,
      locationName,
      onClick,
    } = this.props;

    const cardClass = classnames(classes.card, {
      [cardClassName]: cardClassName !== '',
    });

    return (
      <Card cardClassName={ cardClass } onClick={ onClick }>
        <div className={ classes.imgContainer }>
          <img src={ img } alt={ `${locationName} logo` } className={ classes.img } />
        </div>
        <div className={ classes.locationName }>{ locationName }</div>
      </Card>
    );
  }
}

LocationCard.propTypes = propTypes;
LocationCard.defaultProps = defaultProps;
export default injectSheet(styles)(LocationCard);
