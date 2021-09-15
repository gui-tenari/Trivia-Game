import { combineReducers } from 'redux';
import player from './playerReducer';
import game from './gameReducer';
import ranking from './rakingReducer';

const rootReducer = combineReducers({ player, game, ranking });

export default rootReducer;
