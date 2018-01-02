import { combineReducers } from 'redux';

import weather from './weather';
import places from './places';
import place from './place';

export default combineReducers({
  weather,
  places,
  place
});