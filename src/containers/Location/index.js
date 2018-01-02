import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './styles.css';
import locationSvg from '../../assets/images/location.svg';

import { getWeather } from '../../actions/weather'
import { createPlaceWithPosition } from '../../actions/place';

class Location extends Component {
  constructor(props) {
    super(props);

    this.onCurrentPosition = this.onCurrentPosition.bind(this);
  }

  onCurrentPosition() {
    const { t } = this.props;

    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.createPlaceWithPosition(position.coords.latitude, position.coords.longitude, (place) => {
          if (!place) {
            alert(t('locationPlaceNotFound'));
          } else {
            this.props.getWeather(place.woeid, (weather) => {
              if (weather.count > 0) {
                this.props.history.push('/');
              } else {
                alert(t('locationWeatherNotFound'));
              }
            });
          }
        });
      },
      error => {
        alert(t('locationPositionNotFound'));
      });
  }

  render() {
    const { t, place } = this.props;

    return (
      <div className="Location">
        <h3 className="Location--title">
          <div>{place ? t('locationSecondTitle') : t('locationFirstTitle')}</div>
          <div>{t('locationDescription')}</div>
        </h3>
        <button className="Location--button" onClick={this.onCurrentPosition}>
          <img src={locationSvg} alt="location" width="20" height="24" />
          {t('locationButton')}
        </button>
        <Link className="Location--link" to="/search">
          {t('locationLink')}
        </Link>
      </div>
    )
  }
}

Location.propTypes = {
  place: PropTypes.object,
  getWeather: PropTypes.func,
  createPlaceWithPosition: PropTypes.func
};

Location.defaultProps = {
  place: null,
  getWeather: () => console.error('getWeather is not defined'),
  createPlaceWithPosition: () => console.error('createPlaceWithPosition is not defined')
};

Location = translate()(Location);

Location = connect(
  ({place}) => ({
    place
  }),
  {
    getWeather,
    createPlaceWithPosition
  }
)(Location);

export default Location;