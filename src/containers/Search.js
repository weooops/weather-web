import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './Search.css';

import { getWeather, searchPlaces, createPlace } from '../actions';
import SearchInput from '../components/SearchInput';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { onSearch: false };
    this.selectPosition = 0;

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onPlaceSearch = this.onPlaceSearch.bind(this);
    this.onSelectPlace = this.onSelectPlace.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(e) {
    const { places } = this.props;
    const placeListItems = this.refs.placeList.querySelectorAll('.Search--place-item');

    if (this.state.onSearch && places.length > 0) {
      if (e.keyCode === 38) { // up
        if (this.selectPosition === 0) {
          this.selectPosition = placeListItems.length;
        }

        placeListItems[--this.selectPosition].querySelector('.tab-item').focus();
      } else if (e.keyCode === 40) { // down
        if (this.selectPosition === placeListItems.length-1) {
          this.selectPosition = -1;
        }

        placeListItems[++this.selectPosition].querySelector('.tab-item').focus();
      }
    }
  }

  onKeyUp(e) {
    const { places } = this.props;

    if (this.state.onSearch && places.length > 0) {
      if (e.keyCode === 9) { // tab
        let placeListItems = this.refs.placeList.querySelectorAll('.Search--place-item');

        placeListItems.forEach((item, i) => {
          if (item.querySelector('.tab-item') === document.activeElement) {
            this.selectPosition = i;
          }
        });
      }
    }
  }

  onPlaceSearch(term) {
    if (term) {
      this.props.searchPlaces(term, () => {
        this.setState({ onSearch: true });
      });
    } else {
      this.setState({ onSearch: false });
    }
    
    this.selectPosition = 0;
  }

  onSelectPlace(place) {
    this.props.createPlace(place, () => {
      this.props.getWeather(place.woeid, () => {
        this.props.history.push('/');
      });
    });
  }

  onMouseOver(e) {
    let placeListItems = this.refs.placeList.querySelectorAll('.Search--place-item');

    placeListItems.forEach((item, i) => {
      if (item.querySelector('.tab-item') === e.target) {
        this.selectPosition = i;
        e.target.focus();
      }
    });
  }

  renderPlaces() {
    const { t, places } = this.props;

    if (places.length > 0) {
      return places.map(place => {
        const { woeid, locality1, admin1, country } = place;

        return (
          <li key={woeid}
            className="Search--place-item"
            data-place={JSON.stringify(place)}
          >
            <button className="Search--deep-item tab-item"
              onMouseOver={this.onMouseOver}
              onClick={() => this.onSelectPlace(place)}>
              {locality1 ? `${locality1.content}, ` : ''}
              {admin1 ? `${admin1.content}, ` : ''}
              {country.code}
            </button>
          </li>
        );
      });
    }

    return (
      <li className="Searh--empty-item">
        <span className="Search--deep-item">{t('searchEmptyItem')}</span>
      </li>
    );
  }

  render() {
    const { t } = this.props;

    const onPlaceSearch = _.debounce(term => {
      this.onPlaceSearch(term)
    }, 500);

    return (
      <div className="Search">
        <h3 className="Search--title"><br />{t('searchTitle')}</h3>
        <ul className="Search--place-list" ref="placeList">
          <li className="Search--place-item">
            <SearchInput onSearchTermChange={onPlaceSearch} />
          </li>
          {this.state.onSearch ? this.renderPlaces() : null}
        </ul>
      </div>
    )
  }
}

Search.propTypes = {
  places: PropTypes.array,
  getWeather: PropTypes.func,
  searchPlaces: PropTypes.func,
  createPlace: PropTypes.func
};

Search.defaultProps = {
  places: [],
  getWeather: () => console.error('getWeather is not defined'),
  searchPlaces: () => console.error('searchPlaces is not defined'),
  createPlace: () => console.error('createPlace is not defined')
};

Search = translate()(Search);

Search = connect(
  ({places}) => ({
    places
  }),
  {
    getWeather,
    searchPlaces,
    createPlace
  }
)(Search);

export default Search;