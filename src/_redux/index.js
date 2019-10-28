import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import toons from '../_reducers/toons';
import favorite from '../_reducers/favorite';

// The Global state
const rootReducer = combineReducers({
  toons,
  favorite,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
