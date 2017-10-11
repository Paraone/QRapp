import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// reducser imports here
import fruit from './fruit';

const rootReducer = combineReducers({fruit, routing: routerReducer});

export default rootReducer;
