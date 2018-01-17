import axios from 'axios';

import * as actions from './index';

export const GET_PLACE = 'GET_PLACE';
export const CHANGE_PLACE = 'CHANGE_PLACE';
export const SELECT_PLACE = 'SELECT_PLACE';
export const CREATE_PLACE = 'CREATE_PLACE';

const initCallback = () => {};

/**
 * 도시를 가져온다.
 */
export function getPlace() {
  return {
    type: GET_PLACE
  };
}

/**
 * 도시를 변경한다.
 * 언어가 바꼇을 시 변경된 언어 타입으로 도시를 다시 가져오기 위함이다.
 * @param {Object} place 도시 오브젝트
 */
export function changePlace(place) {
  return dispatch => {
    if (place) {
      const language = actions.getLanguage();
      const PLACE_QUERY_WITH_WOEID = `&q=select * from geo.places where woeid='${place.woeid}' and lang='${language}'`;
      axios
        .get(`${actions.ROOT_URL}${PLACE_QUERY_WITH_WOEID}`)
        .then((res) => {
          dispatch({
            type: CHANGE_PLACE,
            payload: res.data.query.results.place
          });
        })
    } else {
      dispatch({
        type: CHANGE_PLACE,
        payload: null
      });
    }
  };
}

/**
 * 검색 한 도시중에 선택할 경우
 * @param {Object} place 도시 오브젝트
 * @param {Function} cb 콜백 함수
 */
export function selectPlace(place, cb = initCallback) {
  return dispatch => {
    dispatch({
      type: SELECT_PLACE,
      payload: place
    });
    cb();
  };
}

/**
 * 도시를 셋팅한다.
 * @param {Object} place 도시 오브젝트
 * @param {Function} cb 콜백 함수
 */
export function createPlace(place, cb = initCallback) {
  return dispatch => {
    dispatch({
      type: CREATE_PLACE,
      payload: place
    });
    cb(place);
  };
}

/**
 * GPS값을 가지고 도시를 조회하여 설정한다.
 * @param {number} lat 위도
 * @param {number} lng 경도
 * @param {Function} cb 콜백 함수
 */
export function createPlaceWithPosition(lat, lng, cb = initCallback) {
  const language = actions.getLanguage();
  const PLACE_QUERY_WITH_POSITION = `&q=select * from geo.places where text='(${lat}, ${lng})' and lang='${language}'`;

  return dispatch => {
    axios
      .get(`${actions.ROOT_URL}${PLACE_QUERY_WITH_POSITION}`)
      .then((res) => {
        dispatch({
          type: CREATE_PLACE,
          payload: res.data.query.results.place
        });
        cb(res.data.query.results.place);
      });
  };
}