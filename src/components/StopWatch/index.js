import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerQuestion } from '../../redux/actions/index';
import './style.css';

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { timer } = this.state;
    if (timer > 0) {
      this.timer();
    }
  }

  timer() {
    const { answered } = this.props;
    const ONE_SECOND = 1000;
    const Id = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState((previous) => ({
          timer: previous.timer - 1,
        }));
      } else {
        answered(true);
        clearInterval(Id);
      }
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    return (
      <div id="timer">{ timer }</div>
    );
  }
}

StopWatch.propTypes = {
  answered: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  answered: (payload) => dispatch(answerQuestion(payload)),
});

export default connect(null, mapDispatchToProps)(StopWatch);
