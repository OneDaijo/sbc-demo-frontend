import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Card from '../Card';
import colors from '../../../utils/colors';

const propTypes = {
  classes: PropTypes.object.isRequired,
  locationName: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  numLocationsNearby: PropTypes.number, // TODO: default to zero until we can retrieve this number
};

const defaultProps = {
  numLocationsNearby: 0,
};

const styles = {
  card: {
    minHeight: '400px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-center',
    paddingTop: '30px',
    paddingRight: '30px',
    paddingBottom: '30px',
    paddingLeft: '30px',
  },
  locationName: {
    marginTop: '37px',
    fontSize: '18px',
    lineHeight: '30px',
    color: colors.GRAY_XXDARK,
  },
  numLocationsNearby: {
    fontSize: '14px',
    lineHeight: '16px',
    color: colors.GRAY_XXDARK,
  },
};

class PickupLocationOption extends PureComponent {
  render() {
    const {
      classes,
      locationName,
      iconSrc,
      numLocationsNearby,
    } = this.props;

    let numNearbyElement = null;
    if (numLocationsNearby > 0) {
      numNearbyElement = (
        <div className={ classes.numLocationsNearby }>
          { numLocationsNearby }
        </div>
      );
    }

    return (
      <Card>
        <div className={ classes.iconContainer }>
          <img
            src={ iconSrc }
            alt=""
            className={ classes.icon }
          />
        </div>
        <div className={ classes.cardBottom }>
          <div className={ classes.locationName }>
            { locationName }
          </div>
          { numNearbyElement }
        </div>
      </Card>
    );
  }
}

PickupLocationOption.propTypes = propTypes;
PickupLocationOption.defaultProps = defaultProps;
export default injectSheet(styles)(PickupLocationOption);
