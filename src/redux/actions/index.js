export const LOGIN = 'LOGIN';

const login = (token, name, email) => ({
  type: LOGIN,
  token,
  name,
  email,
});

export const getTriviaToken = (name, email) => (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json())
    .then(({ token }) => {
      dispatch(login(token, name, email));
      localStorage.setItem('token', token);
    });
};

export const SET_QUESTIONS = 'SET_QUESTIONS';

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

export const fetchQuestions = () => async (dispatch, getState) => {
  const { player: { token } } = getState();

  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();

  const questions = results.map((question) => ({
    ...question,
    answers: [question.correct_answer, ...question.incorrect_answers]
      .map((answer) => ({ answer, aux: Math.random() }))
      .sort((a, b) => a.aux - b.aux)
      .map(({ answer }) => answer),
  }));

  dispatch(setQuestions(questions));
};

export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const answerQuestion = (answered) => ({
  type: ANSWER_QUESTION,
  payload: answered,
});

export const SET_SCORE = 'SET_SCORE';

const setScore = (score) => ({
  type: SET_SCORE,
  payload: score,
});

export const calculateScoreThunk = (difficulty, timer) => (dispatch) => {
  const multiplicator = {
    hard: 3,
    medium: 2,
    easy: 1,
  };
  const BASE_SCORE = 10;
  const score = BASE_SCORE + (timer * multiplicator[difficulty]);
  dispatch(setScore(score));
};

export const SET_PLAYER_INFOS = 'SET_PLAYER_INFOS';

export const setPlayerInfos = (player) => ({
  type: SET_PLAYER_INFOS,
  payload: player,
});

export const RESET_STORE = 'RESET_STORE';

export const resetStore = () => ({
  type: RESET_STORE,
});

export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE';

export const getLocalStorage = (payload) => ({
  type: GET_LOCAL_STORAGE,
  payload,
});
