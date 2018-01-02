import axios from 'axios';

import * as actions from './index';

export const SEARCH_PLACES = 'SEARCH_PLACES';

const initCallback = () => {};

/**
 * 도시를 검색한다.
 * @param {string} term 조회 조건값
 * @param {fn} cb 
 */
export function searchPlaces(term, cb = initCallback) {
  const language = actions.getLanguage();
  const PLACE_QUERY = `&q=select * from geo.places(5) where text='*${term}*' and placetype=7 and lang='${language}'`;

  return dispatch => {
    axios
      .get(`${actions.ROOT_URL}${PLACE_QUERY}`)
      .then((res) => {
        dispatch({
          type: SEARCH_PLACES,
          payload: res.data.query.results
        });
        cb();
      });
  };
}
