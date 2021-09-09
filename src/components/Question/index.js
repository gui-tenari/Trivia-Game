import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './styles.css';
import { answerQuestion } from '../../redux/actions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.isWrong = this.isWrong.bind(this);
  }

  isWrong(answer, index) {
    const { selected, correct_answer: correctAnswer } = this.props;

    if (selected) {
      return answer === correctAnswer ? 'right' : 'wrong';
    }

    return `wrong-answer-${index}`;
  }

  render() {
    const {
      question,
      category,
      correct_answer: correctAnswer,
      selected,
      select,
      answers } = this.props;

    return (
      <article>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ `${question}` }</p>
        <section>
          {
            answers.map((answer, index) => (
              <button
                data-testid={
                  answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                }
                disabled={ selected }
                className={ this.isWrong(answer, index) }
                type="button"
                key={ answer }
                onClick={ select }
              >
                { answer }
              </button>
            ))
          }
        </section>
      </article>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  correct_answer: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  question: PropTypes.string,
};

Question.defaultProps = {
  category: '',
  correct_answer: '',
  answers: [],
  question: '',
};

const mapStateToProps = (state) => ({
  selected: state.game.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  select: () => dispatch(answerQuestion(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
