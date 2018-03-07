import { combineReducers } from 'redux';

import activeLoan from './activeLoan';
import loans from './loans';
import user from './user';

export default combineReducers({
  activeLoan,
  loans,
  user,
});
