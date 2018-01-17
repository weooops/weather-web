import { GET_PLACE, CHANGE_PLACE, SELECT_PLACE, CREATE_PLACE } from '../actions/place';

/**
 * 도시 Reducer
 * @param {State} state redux state 데이터
 * @param {Action} action redux action 데이터
 */
const initPlaceState = null;
function place(state = initPlaceState, action) {
  switch (action.type) {
    // 로컬 저장소의 도시 데이터 조회
    case GET_PLACE:
      return JSON.parse(localStorage.getItem('place')) || initPlaceState;
    // 로컬 저장소의 도시 데이터 변경
    case CHANGE_PLACE:
      if (action.payload) {
        localStorage.setItem('place', JSON.stringify(action.payload));
        return action.payload;
      }
      return state;
    // 검색된 도시 리시트중 선택
    case SELECT_PLACE:
      localStorage.setItem('place', JSON.stringify(action.payload));
      return action.payload;
    // 해당 도시로 생성
    case CREATE_PLACE:
      localStorage.setItem('place', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}

export default place;