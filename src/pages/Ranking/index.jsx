import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();
    this.redirectButton = this.redirectButton.bind(this);
  }

  redirectButton() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { currentRanking } = this.props;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { currentRanking.map((user, index) => {
            const { name, score, gravatarEmail } = user;
            return (
              <div key={ `${gravatarEmail}-${index}` }>
                <img src={ gravatarEmail } alt="imagem da pessoa" />
                <h4 data-testid={ `player-name-${index} ` }>{ name }</h4>
                <p data-testid={ `player-score-${index}` }>
                  Score:
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
};

const mapStateToProps = (state) => ({
  currentRanking: state.ranking,
});

export default connect(mapStateToProps)(Ranking);
