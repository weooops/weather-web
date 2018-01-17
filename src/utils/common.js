/**
 * 공통 코드를 관리
 */

import MobileDetect from 'mobile-detect';
import moment from 'moment';

/**
 * HTML 문서 언어를 설정한다.
 * @param {string} language 언어
 */
export function setHTMLLang(language) {
  document.documentElement.lang = language;
}

/**
 * 브라우저 높이가 가로높이보다 더 클 경우로 비교하여
 * "portrait" / "landscape"를 선택한다.
 */
export function getApplyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   return 'portrait';
  } else {
    return 'landscape';
  }
}

/**
 * 현재 브라우저의 "mobile", "desktop" 여부를 확인한다.
 */
export function getMobileOrdesktop() {
  return new MobileDetect(navigator.userAgent).mobile() ? 'mobile' : 'desktop';
}

/**
 * 가져올 날짜의 계절을 확인한다.
 * @param {Date} date 날짜
 */
export function getSeason(date) {
  const month = moment(new Date(date)).format('MM');

  switch (month) {
    case '12':
    case '01':
    case '02':
      return 'winter';
    case '03':
    case '04':
    case '05':
      return 'spring';
    case '06':
    case '07':
    case '08':
      return 'summer';
    case '09':
    case '10': 
    case '11':
      return 'fall';
    default:
      return null;
  }
}

/**
 * 날짜 API의 일몰, 일출 기준을 적용하여 낮과 밤을 구분한다.
 * @param {Date} date 날짜
 * @param {string} sunrise 일출
 * @param {string} sunset 일몰
 */
export function getDayOrNight(date, sunrise = '6:00 am', sunset = '6:00 pm') {
  const time = moment(new Date(date));
  const currentHour = +time.format('k');
  const currentMinutes = +time.format('mm');
  const currentClocks = parseFloat(`${currentHour}.${currentMinutes}`);

  sunrise = sunrise.split(' ')[0];
  const sunriseHour = +(sunrise.split(':')[0]);
  const sunriseMinutes = +(sunrise.split(':')[1]);
  const sunriseClocks = parseFloat(`${sunriseHour}.${sunriseMinutes}`);

  sunset = sunset.split(' ')[0];
  const sunsetHour = +(sunset.split(':')[0])+12;
  const sunsetMinutes = +(sunset.split(':')[1]);
  const sunsetClocks = parseFloat(`${sunsetHour}.${sunsetMinutes}`);

  if (currentClocks < sunriseClocks || currentClocks >= sunsetClocks) {
    return 'night';
  }

  if (currentClocks >= sunriseClocks && currentClocks < sunsetClocks) {
    return 'day';
  }
}

/**
 * 가져온 배열에서 랜덤하게 배열 아이템을 선택한다.
 * @param {Array} arr 배열
 */
export function getRandomItem(arr) {
  return arr[Math.round(Math.random() * arr.length)];
}