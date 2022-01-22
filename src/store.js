import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import stringReducer from './reducers/stringReducer';
import soundboardReducer from './reducers/soundboardReducer';
import pillarReducer from './reducers/pillarReducer';
import neckReducer from './reducers/neckReducer';

const reducers = combineReducers({
  string: stringReducer,
  soundboard: soundboardReducer,
  pillar: pillarReducer,
  neck: neckReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
