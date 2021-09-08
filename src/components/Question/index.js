import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = this.props;

    this.state = {
      answers: [correctAnswer, ...incorrectAnswers]
        .map((answer) => ({ answer, aux: Math.random() }))
        .sort((a, b) => a.aux - b.aux)
        .map(({ answer }) => answer),
      selected: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      selected: true,
    });
  }

  render() {
    const {
      question,
      category,
      correct_answer: correctAnswer } = this.props;
    const { answers, selected } = this.state;

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
                className={ selected && answer === correctAnswer ? 'right' : 'wrong' }
                type="button"
                key={ answer }
                onClick={ this.handleClick }
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
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  question: PropTypes.string,
};

Question.defaultProps = {
  category: '',
  correct_answer: '',
  incorrect_answers: [],
  question: '',
};

export default Question;
