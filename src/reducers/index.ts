import { combineReducers } from 'redux';

import actions from './actions';
import error from './error';
import modal from './modal';
import session from './session';

export default combineReducers({
    actions,
    error,
    modal,
    session
});
