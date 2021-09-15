import { SET_QUESTIONS, ANSWER_QUESTION, RESET_STORE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isAnswered: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  case ANSWER_QUESTION:
    return {
      ...state,
      isAnswered: action.payload,
    };
  case RESET_STORE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default gameReducer;
