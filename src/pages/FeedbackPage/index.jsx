import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedbackPage extends React.Component {
  render() {
    const { email, name, score } = this.props;
    const avatarPath = md5(email).toString();
    return (
      <>
        <div data-testid="header-player-name">{ name }</div>
        <img
          data-testid="header-profile-picture"
          alt="profile avatar"
          src={ `https://www.gravatar.com/avatar/${avatarPath}` }
        />
        <div data-testid="header-score">{ score }</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

FeedbackPage.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackPage);
