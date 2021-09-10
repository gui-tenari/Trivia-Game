import { SET_PLAYER_INFOS } from '../actions';

const INITIAL_STATE = [];

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_INFOS:
    localStorage.setItem('ranking', JSON.stringify([...state, action.payload]));
    return [...state, action.payload];
  default:
    return state;
  }
};

export default rankingReducer;
