import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getTriviaToken as getTriviaTokenAction,
  resetStore as resetStoreAction,
  getLocalStorage as getLocalStorageAction,
}
  from '../../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { resetStore, getLocalStorage } = this.props;
    resetStore();
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    getLocalStorage(ranking);
  }

  handleClick() {
    const { getTriviaToken, history } = this.props;
    const { name, email } = this.state;
    getTriviaToken(name, email, history);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <fieldset>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ !name || !email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g) }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </fieldset>
    );
  }
}

Login.propTypes = {
  getLocalStorage: PropTypes.func.isRequired,
  getTriviaToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTriviaToken:
    (name, email, history) => dispatch(getTriviaTokenAction(name, email, history)),
  resetStore: () => dispatch(resetStoreAction()),
  getLocalStorage: (payload) => dispatch(getLocalStorageAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
