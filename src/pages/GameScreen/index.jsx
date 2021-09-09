import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import { fetchQuestions, answerQuestion } from '../../redux/actions';
import Question from '../../components/Question';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestion: 0,
    };

    this.getAvatar = this.getAvatar.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  getAvatar() {
    const { email } = this.props;
    const emailConvert = md5(email).toString();
    return (
      <img
        src={ `https://www.gravatar.com/avatar/${emailConvert}` }
        alt="User avatar"
        data-testid="header-profile-picture"
      />
    );
  }

  handleClick() {
    const { history, questions, resetAnswer } = this.props;
    const { currentQuestion } = this.state;

    resetAnswer();
    if (currentQuestion < questions.length - 1) {
      this.setState(({ currentQuestion: current }) => ({
        currentQuestion: current + 1,
      }));
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const { questions, name, answered, score } = this.props;
    const { currentQuestion } = this.state;

    return (
      <>
        <header>
          <div>
            { this.getAvatar() }
          </div>
          <p data-testid="header-player-name">
            { name }
          </p>
          <span
            data-testid="header-score"
          >
            { score }
          </span>
        </header>
        <main>
          {
            questions.length && <Question { ...questions[currentQuestion] } />
          }
          {
            answered && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.handleClick }
              >
                Próxima
              </button>
            )
          }
        </main>
      </>
    );
  }
}

GameScreen.propTypes = {
  answered: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
  })),
  resetAnswer: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

GameScreen.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  name: state.player.name,
  email: state.player.gravatarEmail,
  answered: state.game.isAnswered,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
  resetAnswer: () => dispatch(answerQuestion(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
