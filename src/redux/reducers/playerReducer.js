import { LOGIN, SET_SCORE, RESET_STORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  token: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    localStorage.setItem('state', JSON.stringify({
      player: {
        ...state,
        token: action.token,
        name: action.name,
        gravatarEmail: action.email,
      },
    }));
    return {
      ...state,
      token: action.token,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SET_SCORE:
    localStorage.setItem('state', JSON.stringify({
      player: {
        ...state,
        score: state.score + action.payload,
        assertions: state.assertions + 1,
      },
    }));
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1 };
  case RESET_STORE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default playerReducer;
