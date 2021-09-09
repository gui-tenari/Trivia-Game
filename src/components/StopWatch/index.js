import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerQuestion } from '../../redux/actions/index';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      timer: 30,
    };

    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const countDown = 29;
    const { timer, isStopped } = this.state;
    const { selected } = this.props;
    if (isStopped && timer < countDown && !selected) {
      this.resetTimer();
    // } else if (!selected && timer === countDown) {
    //   this.timer();
    }
  }

  resetTimer() {
    this.setState({ timer: 30 });
    this.timer()
  }

  timer() {
    const { answered } = this.props;
    const ONE_SECOND = 1000;
    const Id = setInterval(() => {
      const { timer  } = this.state;
      const { selected } = this.props;
      if (!selected && timer > 0) {
        this.setState((previous) => ({
          timer: previous.timer - 1,
          isStopped: false,
        }));
      } else {
        answered(true);
        clearInterval(Id);
        this.setState({ isStopped: true });
      }
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    return (
      <p>{ timer }</p>
    );
  }
}

StopWatch.propTypes = {
  answered: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.game.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  answered: (payload) => dispatch(answerQuestion(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);
