import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container } from 'reactstrap';

import './styles.css';
import { answerQuestion, calculateScoreThunk } from '../../redux/actions';
import StopWatch from '../StopWatch';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };

    this.calculateScore = this.calculateScore.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.showResult = this.showResult.bind(this);
  }

  showResult(answer) {
    const { correct_answer: correctAnswer } = this.props;
    if (answer === correctAnswer) return 'success';
    return 'danger';
  }

  calculateScore() {
    const { select, difficulty, calculateScore } = this.props;
    const { timer } = this.state;
    select();
    calculateScore(difficulty, timer);
  }

  changeTimer(newTime) {
    this.setState({ timer: newTime });
  }

  isDisabled(bool) {
    if (bool) {
      return { disabled: true };
    }
    return '';
  }

  render() {
    const {
      question,
      category,
      correct_answer: correctAnswer,
      select,
      selected,
      answers } = this.props;

    const { timer } = this.state;

    return (
      <article>
        <StopWatch timer={ timer } changeTimer={ this.changeTimer } />
        <Container id="question">
          <p data-testid="question-category"><strong>{ category }</strong></p>
          <p data-testid="question-text">{ `${question}` }</p>
        </Container>
        <section id="answers">
          {
            answers.map((answer, index) => (
              <Button
                data-testid={
                  answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                }
                { ...this.isDisabled(selected) }
                className="answer"
                color={ selected ? this.showResult(answer) : 'secondary' }
                type="button"
                key={ answer }
                onClick={ answer === correctAnswer ? this.calculateScore : select }
              >
                { answer }
              </Button>
            ))
          }
        </section>
      </article>
    );
  }
}

Question.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string),
  calculateScore: PropTypes.func.isRequired,
  category: PropTypes.string,
  correct_answer: PropTypes.string,
  difficulty: PropTypes.string.isRequired,
  question: PropTypes.string,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

Question.defaultProps = {
  category: '',
  correct_answer: '',
  answers: [],
  question: '',
};

const mapStateToProps = (state) => ({
  selected: state.game.isAnswered,
  timer: state.game.currentTime,
});

const mapDispatchToProps = (dispatch) => ({
  select: () => dispatch(answerQuestion(true)),
  calculateScore: (dificult, timer) => dispatch(calculateScoreThunk(dificult, timer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
