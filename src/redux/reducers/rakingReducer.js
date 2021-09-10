import { SET_PLAYER_INFOS, GET_LOCAL_STORAGE } from '../actions';

const INITIAL_STATE = [];

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_INFOS:
    localStorage.setItem('ranking', JSON.stringify([...state, action.payload]));
    return [...state, action.payload];
  case GET_LOCAL_STORAGE:
    return action.payload ? action.payload : state;
  default:
    return state;
  }
};

export default rankingReducer;
