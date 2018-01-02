import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { translate } from 'react-i18next';
import { TweenLite } from "gsap";
import ReactModal from 'react-modal';

import './styles.css';
import logoSvg from '../../assets/images/logo.svg';
import settingSvg from '../../assets/images/setting.svg';

import * as commonActions from '../../utils/common';
import { getDayOrNight, getLanguage, getSelectedImage } from '../../actions';
import { getWeather } from '../../actions/weather';
import weatherCases from '../../utils/weatherCases';
import flagCases from '../../utils/flagCases';

import PrivateRoute from '../../hoc/PrivateRoute';
import Weather from '../Weather';
import Location from '../Location';
import Search from '../Search';
import Settings from '../Settings';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
    this.lastImage = '';

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentWillMount() {
    const { place, weather } = this.props;

    if (place) {
      this.props.getWeather(place.woeid);
    }

    let currentTime = new Date();
    let sunrise = '6:00 am';
    let sunset = '6:00 pm';
    if (weather) {
      currentTime = weather.channel.lastBuildDate;
      currentTime = currentTime.substr(0, currentTime.lastIndexOf(' '));
      sunrise = weather.channel.astronomy.sunrise;
      sunset = weather.channel.astronomy.sunset;
    }
    const mobileOrdesktop = commonActions.getMobileOrdesktop();
    const season = commonActions.getSeason(currentTime);
    const dayOrNight = commonActions.getDayOrNight(currentTime, sunrise, sunset);
    this.lastImage = getSelectedImage() || commonActions.getRandomItem(weatherCases[3200].backgroundImage[mobileOrdesktop][season][dayOrNight]);
  }

  onOpenModal() {
    this.setState({ showModal: true });
  }

  onCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { t, location, place, weather } = this.props;
    const language = getLanguage();
    const dayOrNight = getDayOrNight();

    if (weather) {
      const selectedImage = getSelectedImage();

      if (this.lastImage !== selectedImage) {
        const downloadingImage = new Image();
        downloadingImage.onload = (e) => {
          this.lastImage = selectedImage;

          const afterImgEl = this.refs.backgroundEl.querySelector('img:first-of-type');
          TweenLite.fromTo(
            afterImgEl,
            3,
            { opacity: 1 },
            { opacity: 0, onComplete: () => {
              this.refs.backgroundEl.removeChild(afterImgEl);
            }}
          );

          const beforeImgEl = document.createElement('img');
          beforeImgEl.src = e.target.src;
          this.refs.backgroundEl.insertBefore(beforeImgEl, this.refs.backgroundEl.childNodes[0]);
          TweenLite.fromTo(
            beforeImgEl,
            3,
            { opacity: 0 },
            { opacity: 1 }
          );
        }
        downloadingImage.src = `../images/background/${selectedImage}.jpg`;
      }
    }

    return (
      <div className={[
        'App--container',
        language,
        dayOrNight,
        (location.pathname === '/location' || location.pathname ===  '/search') ? 'blur' : ''
        ].join(' ')}
        ref="backgroundEl"
      >
        <img src={`../images/background/${this.lastImage}.jpg`} alt="backgroundImage" />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <div className="App--main">
              <nav className="App--header">
                <div className="App--header-container">
                  {(location.pathname === '/')
                  ? (
                    <Link to="/location" className="App--header-left-link">
                      {place ? (
                        <img src={`../images/flags/${flagCases[place.country.code]}.svg`} alt={place.country.content} width="16" height="16" />
                      ) : null}
                      {place ? <span>{`${place.locality1.content}, ${place.country.content}`}</span> : null}
                    </Link>
                  ) : (
                    <Link to="/" className="App--header-left-link">
                      {place ? (
                        <img src={logoSvg} className="App--header-left-link-logo" alt="logo" width="12" height="8" />
                      ) : null}
                      {place ? <span>{t('appTellMeLocation')}</span> : null}
                    </Link>
                  )}
                  {(location.pathname === '/')
                  ? (
                    <button className="App--header-right-link" onClick={this.onOpenModal}>
                      <img src={settingSvg} alt="setting" width="24" height="24" />
                    </button>
                  ) : null}
                </div>
              </nav>
              <main className="App--content">
                <div className="App--content-container">
                  <Switch location={location}>
                    <PrivateRoute exact path="/" component={Weather} />
                    <Route path="/location" component={Location} />
                    <Route path="/search" component={Search} />
                    <Route component={() => (
                      <h3 style={{paddingTop: '20px'}}>{t('notFoundPage')}</h3>
                    )}/>
                  </Switch>
                </div>
              </main>
              <footer className="App--footer">
                {(location.pathname === '/location' || location.pathname ===  '/search')
                ? (
                  <img src={logoSvg} alt="logo" width="31px" height="19px" />
                ) : null}
              </footer>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <ReactModal isOpen={this.state.showModal}
          contentLabel="Settings Modal"
          onRequestClose={this.onCloseModal}
          overlayClassName="Settings--overlay"
          className="Settings--content">
          <Settings onCloseModal={this.onCloseModal} />
        </ReactModal>
      </div>
    )
  }
}

App.propTypes = {
  weather: PropTypes.object,
  place: PropTypes.object,
  getWeather: PropTypes.func
};

App.defaultProps = {
  weather: null,
  place: null,
  getWeather: () => console.error('getWeather is not defined')
};

App = translate()(App);

App = connect(
  ({weather, place}) => ({
    weather,
    place
  }),
  {
    getWeather
  }
)(App);

export default App;