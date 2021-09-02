import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTriviaToken as getTriviaTokenAction } from '../../redux/actions';

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

  handleClick() {
    const { getTriviaToken } = this.props;
    getTriviaToken();
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
        <Link to="/game">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !name || !email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g) }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
      </fieldset>
    );
  }
}

Login.propTypes = {
  getTriviaToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTriviaToken: () => dispatch(getTriviaTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);
