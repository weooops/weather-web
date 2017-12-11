import { combineReducers } from 'redux'

import weatherCases from '../weatherCases'
import * as commonActions from '../actions/common'

import { FETCH_WEATHER, GET_LOCAL_WEATHER, SEARCH_PLACES, GET_PLACE, CHANGE_PLACE, SELECT_PLACE, CREATE_PLACE } from '../actions'

const initWeatherState = null
function weather(state = initWeatherState, action) {
  switch (action.type) {
    case FETCH_WEATHER:
      localStorage.setItem('weather', JSON.stringify(action.payload))

      const code = action.payload.channel.item.condition.code
      const mobileOrdesktop = commonActions.getMobileOrdesktop()
      let currentTime = action.payload.channel.lastBuildDate
      currentTime = currentTime.substr(0, currentTime.lastIndexOf(' '))
      const season = commonActions.getSeason(currentTime)
      const sunrise = action.payload.channel.astronomy.sunrise
      const sunset = action.payload.channel.astronomy.sunset
      const dayOrNight = commonActions.getDayOrNight(currentTime, sunrise, sunset)
      const images = weatherCases[code].backgroundImage[mobileOrdesktop][season][dayOrNight]

      localStorage.setItem('dayOrNight', dayOrNight)
      localStorage.setItem('selectedImage', commonActions.getRandomItem(images))

      return action.payload
    case GET_LOCAL_WEATHER:
      return JSON.parse(localStorage.getItem('weather')) || initWeatherState
    default:
      return state
  }
}

const initPlacesState = []
function places(state = initPlacesState, action) {
  switch (action.type) {
    case SEARCH_PLACES:
      if (action.payload) {
        if (!(action.payload.place instanceof Array)) {
          return [ action.payload.place ]
        } else {
          return action.payload.place
        }
      } else {
        return []
      }
  default:
    return state
  }
}

const initPlaceState = null
function place(state = initPlaceState, action) {
  switch (action.type) {
    case GET_PLACE:
      return JSON.parse(localStorage.getItem('place')) || initPlaceState
    case CHANGE_PLACE:
      if (action.payload) {
        localStorage.setItem('place', JSON.stringify(action.payload))
        return action.payload
      }
      return state
    case SELECT_PLACE:
      localStorage.setItem('place', JSON.stringify(action.payload))
      return action.payload
    case CREATE_PLACE:
      localStorage.setItem('place', JSON.stringify(action.payload))
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  weather,
  places,
  place
})