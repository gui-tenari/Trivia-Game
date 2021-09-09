import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  assertions: 0,
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, token: action.token, name: action.name, email: action.email };
  default:
    return state;
  }
};

export default playerReducer;
