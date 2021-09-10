import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetStore as resetStoreAction } from '../../redux/actions';

class Ranking extends Component {
  constructor() {
    super();
    this.redirectButton = this.redirectButton.bind(this);
  }

  redirectButton() {
    const { history, resetStore } = this.props;
    resetStore();
    history.push('/');
  }

  render() {
    const { currentRanking } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { currentRanking.sort((a, b) => b.score - a.score).map((user, index) => {
            const { name, score, gravatarEmail } = user;
            return (
              <div key={ `${gravatarEmail}-${index}` }>
                <img src={ gravatarEmail } alt="imagem da pessoa" />
                <h4 data-testid={ `player-name-${index} ` }>{ name }</h4>
                <p data-testid={ `player-score-${index}` }>
                  { score }
                </p>
              </div>
            );
          }) }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectButton }
        >
          Home
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  currentRanking: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentRanking: state.ranking,
});

const mapDispatchToProps = () => (dispatch) => ({
  resetStore: () => dispatch(resetStoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
