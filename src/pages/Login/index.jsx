/* eslint-disable max-lines-per-function */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Container, Row, Col } from 'reactstrap';
import {
  getTriviaToken as getTriviaTokenAction,
  getLocalStorage as getLocalStorageAction,
} from '../../redux/actions';
import './styles.css';
import TriviaLogo from './Images/trivia.png';

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
    const { getLocalStorage } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    getLocalStorage(ranking);
  }

  handleClick() {
    const { getTriviaToken, history } = this.props;
    const { name, email } = this.state;
    getTriviaToken(name, email);
    history.push('/game');
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    return (
      <Form>
        <img src={ TriviaLogo } alt="Trivia Logo" />
        <Container id="inputs-container">
          <Row>
            <Col>
              <Input
                data-testid="input-player-name"
                type="text"
                name="name"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
                size="lg"
              />
            </Col>
            <Col>
              <Input
                data-testid="input-gravatar-email"
                type="email"
                name="email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChange }
                size="lg"
              />
            </Col>
          </Row>
        </Container>
        <Container id="btns">
          <Button
            data-testid="btn-play"
            type="button"
            id="btn-play"
            disabled={ !name || !email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g) }
            onClick={ this.handleClick }
            color="success"
            size="lg"
          >
            Jogar
          </Button>
          <Button
            type="button"
            data-testid="btn-settings"
            id="btn-settings"
            color="info"
            size="lg"
          >
            Configurações
          </Button>
        </Container>
      </Form>
    );
  }
}

Login.propTypes = {
  getLocalStorage: PropTypes.func.isRequired,
  getTriviaToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.game.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaToken:
    (name, email, history) => dispatch(getTriviaTokenAction(name, email, history)),
  getLocalStorage: (payload) => dispatch(getLocalStorageAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
