import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetStore as resetStoreAction } from '../../redux/actions';

class FeedbackPage extends React.Component {
  constructor() {
    super();

    this.handleFeedbackMsg = this.handleFeedbackMsg.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  componentDidMount() {
    const { assertions } = this.props;
    this.handleFeedbackMsg(assertions);
  }

  handleFeedbackMsg(assertionsNumber) {
    const NUMBER_TREE = 3;

    if (assertionsNumber < NUMBER_TREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  redirectToHome() {
    const { history, resetStore } = this.props;
    resetStore();
    history.push('/');
  }

  render() {
    const { email, name, score, assertions } = this.props;
    const avatarPath = md5(email).toString();
    return (
      <>
        <div data-testid="header-player-name">{ name }</div>
        <img
          data-testid="header-profile-picture"
          alt="profile avatar"
          src={ `https://www.gravatar.com/avatar/${avatarPath}` }
        />
        <div data-testid="header-score">
          { score }
        </div>
        <div>
          <div data-testid="feedback-total-score">
            { score }
          </div>
          <div data-testid="feedback-total-question">
            { assertions }
          </div>
        </div>
        <div data-testid="feedback-text">{ this.handleFeedbackMsg(assertions) }</div>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToHome }
        >
          Jogar novamente
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = () => (dispatch) => ({
  resetStore: () => dispatch(resetStoreAction()),
});

FeedbackPage.propTypes = {
  assertions: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  resetStore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPage);
