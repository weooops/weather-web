import MobileDetect from 'mobile-detect'
import moment from 'moment'

export function setHTMLLang(language) {
  document.documentElement.lang = language
}

export function getApplyOrientation() {
  if (window.innerHeight > window.innerWidth) {
   return 'portrait'
  } else {
    return 'landscape'
  }
}

export function getMobileOrdesktop() {
  return new MobileDetect(navigator.userAgent).mobile() ? 'mobile' : 'desktop'
}

export function getSeason(date) {
  const month = moment(new Date(date)).format('MM')

  switch (month) {
    case '12':
    case '1':
    case '2':
      return 'winter'
    case '3':
    case '4':
    case '5':
      return 'spring'
    case '6':
    case '7':
    case '8':
      return 'summer'
    case '9':
    case '10': 
    case '11':
      return 'fall'
    default:
      return null
  }
}

export function getDayOrNight(date, sunrise = '6:00 am', sunset = '6:00 pm') {
  const time = moment(new Date(date))
  const currentHour = +time.format('k')
  const currentMinutes = +time.format('mm')
  const currentClocks = parseFloat(`${currentHour}.${currentMinutes}`)

  sunrise = sunrise.split(' ')[0]
  const sunriseHour = +(sunrise.split(':')[0])
  const sunriseMinutes = +(sunrise.split(':')[1])
  const sunriseClocks = parseFloat(`${sunriseHour}.${sunriseMinutes}`)

  sunset = sunset.split(' ')[0]
  const sunsetHour = +(sunset.split(':')[0])+12
  const sunsetMinutes = +(sunset.split(':')[1])
  const sunsetClocks = parseFloat(`${sunsetHour}.${sunsetMinutes}`)

  if (currentClocks < sunriseClocks || currentClocks >= sunsetClocks) {
    return 'night'
  }

  if (currentClocks >= sunriseClocks && currentClocks < sunsetClocks) {
    return 'day'
  }
}

export function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}