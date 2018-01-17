import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import './styles.css';

import flagCases from '../../utils/flagCases';
import * as commonActions from '../../utils/common';
import { getTemperature, setTemperature, getLanguage } from '../../actions';
import { getWeather } from '../../actions/weather';
import { changePlace } from '../../actions/place';

class Settings extends Component {
  state = { languageModal: false };

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.modalFirstEl).focus();

    window.addEventListener('keydown', this.onKeyDown);
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  
  onKeyDown = (e) => {
    e.keyCode === 27 && this.onCloseModal();
  }

  onCloseModal = () => {
    this.props.onCloseModal();
  }

  onToggleTemperature = (temperature) => {
    if (temperature === 'C') {
      setTemperature('F');
    } else {
      setTemperature('C');
    }

    const { place } = this.props;
    if (place) {
      this.props.getWeather(place.woeid);
    }

    this.onCloseModal();
  }

  onChangeLanguageModal = () => {
    this.setState({
      languageModal: true
    });

    setTimeout(() => {
      this.refs.languageModalFirstEl && ReactDOM.findDOMNode(this.refs.languageModalFirstEl).focus();
    }, 25);
  }

  onSelectLanguage = (language) => {
    const { i18n, place } = this.props;

    i18n.changeLanguage(language);
    commonActions.setHTMLLang(language);
    this.props.changePlace(place);
    this.onCloseModal();
  }

  renderLanguageModal = (language) => {
    const { t } = this.props;

    return (
      <ul className="Settings-list">
        <li className="Settings--list-item" key="ko">
          <button className="Settings--list-item-link" ref="languageModalFirstEl"
            onClick={() => this.onSelectLanguage('ko')}>
            <img src={`../images/flags/${flagCases['KR']}.svg`} alt="Korea" width="16px" height="16px" />
            <span className={_.includes(language, 'ko') ? 'on' : ''}>{t('settingsKorean')}</span>
          </button>
        </li>
        <li className="Settings--list-item" key="en">
          <button className="Settings--list-item-link"
            onClick={() => this.onSelectLanguage('en')}>
            <img src={`../images/flags/${flagCases['US']}.svg`} alt="USA" width="16px" height="16px" />
            <span className={_.includes(language, 'en') ? 'on' : ''}>{t('settingsEnglish')}</span>
          </button>
        </li>
        <li className="Settings--list-item" key="ja">
          <button className="Settings--list-item-link"
            onClick={() => this.onSelectLanguage('ja')}>
            <img src={`../images/flags/${flagCases['JP']}.svg`} alt="Japan" width="16px" height="16px" />
            <span className={_.includes(language, 'ja') ? 'on' : ''}>{t('settingsJapanese')}</span>
          </button>
        </li>
        <li className="Settings--list-item" key="modalClose">
          <button className="Settings--list-item-link"
            onClick={this.onCloseModal}>
            {t('settingsCancel')}
          </button>
        </li>
      </ul>
    );
  }

  renderModal = (temperature) => {
    const { t } = this.props;

    return (
      <ul className="Settings--list">
        <li className="Settings--list-item" key="location">
          <Link className="Settings--list-item-link" ref="modalFirstEl" to="/location"
            onClick={this.onCloseModal}>
            <span>{t('settingsLocation')}</span>
            <span>{t('settingsChange')}</span>
          </Link>
        </li>
        <li className="Settings--list-item" key="temperature">
          <button className="Settings--list-item-link"
            onClick={() => this.onToggleTemperature(temperature)}>
            <span className={temperature === 'C' ? 'on' : ''}>{t('settingsCelsius')}</span>
            <span style={{margin: '0 4px'}}>/</span>
            <span className={temperature === 'F' ? 'on' : ''}>{t('settingsFahrenheit')}</span>
            <span>{t('settingsChange')}</span>
          </button>
        </li>
        <li className="Settings--list-item" key="language">
          <button className="Settings--list-item-link"
            onClick={this.onChangeLanguageModal}>
            <span>{t('settingsLanguage')}</span>
            <span>{t('settingsChange')}</span>
          </button>
        </li>
        <li className="Settings--list-item" key="modalClose">
          <button className="Settings--list-item-link"
            onClick={this.onCloseModal}>
            {t('settingsCancel')}
          </button>
        </li>
      </ul>
    );
  }

  render() {
    const { languageModal } = this.state;
    const language = getLanguage();
    const temperature = getTemperature();

    return (
      <div ref="settingListEl">
        {languageModal ? this.renderLanguageModal(language) : this.renderModal(temperature)}
      </div>
    );
  }
}

Settings.propTypes = {
  place: PropTypes.object,
  getWeather: PropTypes.func,
  changePlace: PropTypes.func,
  onCloseModal: PropTypes.func
};

Settings.defaultProps = {
  place: null,
  getWeather: () => console.error('getWeather is not defined'),
  changePlace: () => console.error('changePlace is not defined'),
  onCloseModal: () => console.error('onCloseModal is not defined')
};

Settings = translate()(Settings);

Settings = connect(
  ({ place }) => ({
    place
  }),
  {
    getWeather,
    changePlace
  }
)(Settings);

export default Settings;