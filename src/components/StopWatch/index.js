import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerQuestion } from '../../redux/actions/index';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
    };

    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const countDown = 30;
    const { isStopped } = this.state;
    const { selected, timer } = this.props;
    if (isStopped && timer < countDown && !selected) {
      this.resetTimer();
    }
  }

  resetTimer() {
    const { changeTimer } = this.props;
    const COUNTDOWN = 30;
    changeTimer(COUNTDOWN);
    this.timer();
  }

  timer() {
    const { answered } = this.props;
    const ONE_SECOND = 1000;
    this.setState({ isStopped: false });
    const Id = setInterval(() => {
      const { selected, changeTimer, timer } = this.props;
      if (!selected && timer > 0) {
        changeTimer(timer - 1);
      } else {
        answered();
        clearInterval(Id);
        this.setState({ isStopped: true });
      }
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>{ timer }</div>
    );
  }
}

StopWatch.propTypes = {
  changeTimer: PropTypes.func.isRequired,
  answered: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.game.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  answered: () => dispatch(answerQuestion(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);
