import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchQuestions } from '../../redux/actions';
import Question from '../../components/Question';

class GameScreen extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;

    return (
      <main>
        {
          questions.length && <Question { ...questions[0] } />
        }
      </main>
    );
  }
}

GameScreen.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
  })),
};

GameScreen.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
