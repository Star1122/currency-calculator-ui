import { combineReducers } from 'redux';

import converter from './converter';
import history from './history';
import theme from './theme';

export default combineReducers({
  converter,
  history,
  theme,
});
