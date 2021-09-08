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

  dispatch(setQuestions(results));
};
