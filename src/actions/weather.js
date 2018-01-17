import axios from 'axios';

import * as actions from './index';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const GET_LOCAL_WEATHER = 'GET_LOCAL_WEATHER';

const initCallback = () => {};
let asyncActive = false;
let lastId = null;

/**
 * 날씨 데이터를 가져온다.
 * @param {Dispath} dispatch getWeather()의 dispatch
 * @param {string} id 도시 아이디
 * @param {Function} cb 콜백 함수
 */
function fetchWeather(dispatch, id, cb = initCallback) {
  const temperature = actions.getTemperature();
  const WEATHER_QUERY = `&q=select * from weather.forecast where u='${temperature}' and woeid=${id}`;

  axios
    .get(`${actions.ROOT_URL}${WEATHER_QUERY}`)
    .then((res) => {
      dispatch({
        type: FETCH_WEATHER,
        payload: res.data.query.results
      });
      cb(res.data.query);
    });
}

/**
 * 1분마다 날씨 데이터를 가져온다.
 * @param {string} id 도시 아이디
 * @param {Function} cb 콜백 함수
 */
export function getWeather(id, cb = initCallback) {
  // 1분마다 날씨 데이터를 가져오도록 설정하였다.
  // 반복 시간을 변경하려면 time값을 ms단위로 변경하면 된다.
  const time = 60000;

  return dispatch => {
    lastId = id;
    if (!asyncActive) {
      asyncActive = true;
      fetchWeather(dispatch, lastId, cb);
      setInterval(() => {
        fetchWeather(dispatch, lastId);
      }, time);
    } else {
      fetchWeather(dispatch, lastId, cb);
    }
  };
}

/**
 * 로컬 저장소에 저장된 날씨 데이터를 가져온다.
 */
export function getLocalWeather() {
  return {
    type: GET_LOCAL_WEATHER
  };
}