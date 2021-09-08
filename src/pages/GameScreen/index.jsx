import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

import { fetchQuestions } from '../../redux/actions';
import Question from '../../components/Question';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.getAvatar.bind(this);
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

  render() {
    const { questions, name } = this.props;

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
            0
          </span>
        </header>
        <main>
          {
            questions.length && <Question { ...questions[0] } />
          }
        </main>
      </>
    );
  }
}

GameScreen.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
  })),
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

GameScreen.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  name: state.player.name,
  email: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
