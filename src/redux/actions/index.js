export const SET_TOKEN = 'SET_TOKEN';

const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const getTriviaToken = () => (dispatch) => {
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json())
    .then(({ token }) => {
      dispatch(setToken(token));
      localStorage.setItem('token', token);
    });
};
