import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// reducser imports here
import home from './home';
import user from './user';

const rootReducer = combineReducers({home, user, routing: routerReducer});

export default rootReducer;
