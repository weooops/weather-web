import weatherCases from '../utils/weatherCases';
import * as commonActions from '../utils/common';

import { FETCH_WEATHER, GET_LOCAL_WEATHER } from '../actions/weather';

/**
 * 날씨 Reducer
 * @param {*} state 
 * @param {*} action 
 */
const initWeatherState = null;
function weather(state = initWeatherState, action) {
  switch (action.type) {
    // API를 통해 날씨 데이터 설정
    case FETCH_WEATHER:
      localStorage.setItem('weather', JSON.stringify(action.payload));

      const code = action.payload.channel.item.condition.code;
      const mobileOrdesktop = commonActions.getMobileOrdesktop();
      let currentTime = action.payload.channel.lastBuildDate;
      currentTime = currentTime.substr(0, currentTime.lastIndexOf(' '));
      const season = commonActions.getSeason(currentTime);
      const sunrise = action.payload.channel.astronomy.sunrise;
      const sunset = action.payload.channel.astronomy.sunset;
      const dayOrNight = commonActions.getDayOrNight(currentTime, sunrise, sunset);
      const images = weatherCases[code].backgroundImage[mobileOrdesktop][season][dayOrNight];

      localStorage.setItem('dayOrNight', dayOrNight);
      localStorage.setItem('selectedImage', commonActions.getRandomItem(images));

      return action.payload;
    // 로컬 저장소에 저장된 날씨 데이터로 설정
    case GET_LOCAL_WEATHER:
      return JSON.parse(localStorage.getItem('weather')) || initWeatherState;
    default:
      return state;
  }
}

export default weather;