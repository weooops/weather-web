import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import moment from 'moment'

import './Weather.css'

import * as commonActions from '../actions/common'
import { getLanguage } from '../actions'

class Weather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      forecastToggle: false,
      toggleName: 'toggle-5'
    }

    this.onResize = this.onResize.bind(this)
    this.onForecastToggle = this.onForecastToggle.bind(this)
    this.getForcastTomorrow = this.getForcastTomorrow.bind(this)
  }

  componentDidMount() {
    this.onChangeToggleName()
    window.addEventListener('resize', this.onResize)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    this.onChangeToggleName()
  }

  onChangeToggleName() {
    const deviceHeight = document.documentElement.clientHeight
    if (deviceHeight < 500) {
      this.setState({ toggleName: '' })
    } else if (deviceHeight < 600) {
      this.setState({ toggleName: 'toggle-3' })
    } else {
      this.setState({ toggleName: 'toggle-5' })
    }
  }

  getForcastDate(date, language) {
    if (_.includes(language, 'ko')) {
      return moment(new Date(date)).format('YYYY년 MM월 DD일')
    } else if (_.includes(language, 'ja')) {
      return moment(new Date(date)).format('YYYY年 MM月 DD日')
    } else {
      return moment(new Date(date)).format('MMM DD, YYYY')
    }
  }

  getForcastTomorrow(date, index) {
    const { t } = this.props
    const day = new Date(date).getDay()

    if (index === 1) {
      return t('dayOfWeek:tomorrow')
    } else {
      return t(`dayOfWeek:${day}`)
    }
  }

  onForecastToggle() {
    this.setState({
      forecastToggle: !this.state.forecastToggle
    })
  }

  render() {
    const { t, weather } = this.props
    const language = getLanguage()

    let currentTime = weather.channel.lastBuildDate
    currentTime = currentTime.substr(0, currentTime.lastIndexOf(' '))
    const sunrise = weather.channel.astronomy.sunrise
    const sunset = weather.channel.astronomy.sunset
    const dayOrNight = commonActions.getDayOrNight(currentTime, sunrise, sunset)
    const { condition, forecast } = weather.channel.item

    return (
      <div className="Weather">
        <div className="Weather--main-container">
          <h3 className="Weather--temp">{condition.temp}</h3>
          <p className="Weather--text">{t(`self:${condition.code}`)}</p>
        </div>
        <ul className={`Weather--forecast ${dayOrNight} ${this.state.forecastToggle ? this.state.toggleName : ''}`}
          tabIndex="0"
          onKeyDown={e => e.keyCode === 13 && this.onForecastToggle()}
          onClick={this.onForecastToggle}>
          {forecast.map((dailyWeather, index) => {
            if (index > 0 && index < 6) {
              return (
                <li key={dailyWeather.date} className="Weather--forecast-item">
                  <span className="Weather--forecast-time">
                    <span className="Weather--forecast-date">
                      {this.getForcastDate(dailyWeather.date, language)}
                    </span>
                    <span className="Weather--forecast-day">
                      {this.getForcastTomorrow(dailyWeather.date, index)}
                    </span>
                  </span>
                  <span className="Weather--forecast-icon">
                    <img src={`../images/weather/${dailyWeather.code}.png`} alt={dailyWeather.content} width="48px" height="48px" />
                  </span>
                  <span className="Weather--forecast-temp">
                    <span className="Weather--forecast-low">{dailyWeather.low}</span>
                    <span className="Weather--forecast-temp-split">/</span>
                    <span className="Weather--forecast-high">{dailyWeather.high}</span>
                  </span>
                  <span className="Weather--forecast-description">
                    {t(`forecast:${dailyWeather.code}`)}
                  </span>
                </li>
              )
            }
            return null
          })}
        </ul>
      </div>
    )
  }
}

Weather.propTypes = {
  weather: PropTypes.object
}

Weather.defaultProps = {
  weather: null
}

Weather = translate()(Weather)

Weather = connect(
  ({weather}) => ({
    weather
  })
)(Weather)

export default Weather