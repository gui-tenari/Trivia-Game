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
