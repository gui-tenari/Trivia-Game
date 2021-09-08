import React, { Component } from 'react';
import { connect } from 'react-redux';
import { answerQuestion } from '../../redux/actions/index';

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
        answered();
        clearInterval(Id);
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

const mapStateToProps = (state) => ({
  isAnswered: state.gameReducer.isAnswered,
});

const mapDispatchToProps = (dispatch) => ({
  answered: () => dispatch(answerQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);
