// 날씨 API URL
export const ROOT_URL = 'https://query.yahooapis.com/v1/public/yql?format=json';

/**
 * 로컬 저장소에서 "낮과 밤" 구분 데이터 값을 가져온다.
 */
export function getDayOrNight() {
  return localStorage.getItem('dayOrNight');
}

/**
 * 로컬 저장소에서 현재 선택된 "언어" 값을 가져온다.
 */
export function getLanguage() {
  return localStorage.getItem('i18nextLng');
}

/**
 * 로컬 저장소에 "언어" 값을 저장한다.
 * @param {string} language 
 */
export function setLanguage(language = 'en') {
  localStorage.setItem('i18nextLng', language);
}

/**
 * 로컬 저장소에서 "온도" 값을 가져온다.
 */
export function getTemperature() {
  return localStorage.getItem('temperature');
}

/**
 * 로컬 저장소에 "온도" 값을 저장한다.
 * @param {string} temperature 
 */
export function setTemperature(temperature = 'C') {
  localStorage.setItem('temperature', temperature.toUpperCase());
}

/**
 * 로컬 저장소에서 "선택된 이미지" 값을 가져온다.
 */
export function getSelectedImage() {
  return localStorage.getItem('selectedImage');
}
