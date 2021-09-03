import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
    const currentRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <>
        <ul>
          { currentRanking.map((user, index) => {
            const { name, score, picture } = user;
            return (
              <div key={ picture }>
                <img src={ picture } alt="imagem da pessoa" />
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
