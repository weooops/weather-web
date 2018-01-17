import { SEARCH_PLACES } from '../actions/places';

/**
 * 도시 리스트 Reducer
 * @param {State} state redux state 데이터
 * @param {Action} action redux action 데이터
 */
const initPlacesState = [];
function places(state = initPlacesState, action) {
  switch (action.type) {
    // 도시 리스트 조회
    case SEARCH_PLACES:
      if (action.payload) {
        if (!(action.payload.place instanceof Array)) {
          return [ action.payload.place ];
        } else {
          return action.payload.place;
        }
      } else {
        return [];
      }
  default:
    return state;
  }
}

export default places;