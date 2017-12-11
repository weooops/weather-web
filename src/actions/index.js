import axios from 'axios'

export const FETCH_WEATHER = 'FETCH_WEATHER'
export const GET_LOCAL_WEATHER = 'GET_LOCAL_WEATHER'
export const SEARCH_PLACES = 'SEARCH_PLACES'
export const GET_PLACE = 'GET_PLACE'
export const CHANGE_PLACE = 'CHANGE_PLACE'
export const SELECT_PLACE = 'SELECT_PLACE'
export const CREATE_PLACE = 'CREATE_PLACE'

export const ROOT_URL = 'https://query.yahooapis.com/v1/public/yql?format=json'

const initCallback = () => {}
let asyncActive = false
let lastId = null

export function getDayOrNight() {
  return localStorage.getItem('dayOrNight')
}

export function getLanguage() {
  return localStorage.getItem('i18nextLng')
}

export function setLanguage(language = 'en') {
  localStorage.setItem('i18nextLng', language)
}

export function getTemperature() {
  return localStorage.getItem('temperature')
}

export function setTemperature(language = 'C') {
  localStorage.setItem('temperature', language)
}

export function getSelectedImage() {
  return localStorage.getItem('selectedImage')
}

function fetchWeather(dispatch, id, cb = initCallback) {
  const temperature = getTemperature()
  const WEATHER_QUERY = `&q=select * from weather.forecast where u='${temperature}' and woeid=${id}`

  axios
    .get(`${ROOT_URL}${WEATHER_QUERY}`)
    .then((res) => {
      dispatch({
        type: FETCH_WEATHER,
        payload: res.data.query.results
      })
      cb(res.data.query)
    })
}

export function getWeather(id, cb = initCallback) {
  return dispatch => {
    lastId = id
    if (!asyncActive) {
      asyncActive = true
      fetchWeather(dispatch, lastId, cb)
      setInterval(() => {
        fetchWeather(dispatch, lastId)
      }, 60000)
    } else {
      fetchWeather(dispatch, lastId, cb)
    }
  }
}

export function getLocalWeather() {
  return {
    type: GET_LOCAL_WEATHER
  }
}

export function searchPlaces(term, cb = initCallback) {
  const language = getLanguage()
  const PLACE_QUERY = `&q=select * from geo.places(5) where text='*${term}*' and placetype=7 and lang='${language}'`

  return dispatch => {
    axios
      .get(`${ROOT_URL}${PLACE_QUERY}`)
      .then((res) => {
        dispatch({
          type: SEARCH_PLACES,
          payload: res.data.query.results
        })
        cb()
      })
  }
}

export function getPlace() {
  return {
    type: GET_PLACE
  }
}

export function changePlace(place) {
  return dispatch => {
    if (place) {
      const language = getLanguage()
      const PLACE_QUERY_WITH_WOEID = `&q=select * from geo.places where woeid='${place.woeid}' and lang='${language}'`
      axios
        .get(`${ROOT_URL}${PLACE_QUERY_WITH_WOEID}`)
        .then((res) => {
          dispatch({
            type: CHANGE_PLACE,
            payload: res.data.query.results.place
          })
        })
    } else {
      dispatch({
        type: CHANGE_PLACE,
        payload: null
      })
    }
  }
}

export function selectPlace(place, cb = initCallback) {
  return dispatch => {
    dispatch({
      type: SELECT_PLACE,
      payload: place
    })
    cb()
  }
}

export function createPlace(place, cb = initCallback) {
  return dispatch => {
    dispatch({
      type: CREATE_PLACE,
      payload: place
    })
    cb(place)
  }
}

export function createPlaceWithPosition(lat, lng, cb = initCallback) {
  const language = getLanguage()
  const PLACE_QUERY_WITH_POSITION = `&q=select * from geo.places where text='(${lat}, ${lng})' and lang='${language}'`

  return dispatch => {
    axios
      .get(`${ROOT_URL}${PLACE_QUERY_WITH_POSITION}`)
      .then((res) => {
        dispatch({
          type: CREATE_PLACE,
          payload: res.data.query.results.place
        })
        cb(res.data.query.results.place)
      })
  }
}