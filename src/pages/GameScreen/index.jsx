import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.getAvatar.bind(this);
  }
  // teste

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
    const { name } = this.props;
    return (
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
    );
  }
}

GameScreen.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (payload) => ({
  name: payload.player.name,
  email: payload.player.email,
});

export default connect(mapStateToProps, null)(GameScreen);
