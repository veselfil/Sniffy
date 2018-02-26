import React from 'react';
import PropTypes from 'prop-types';

export default class StartStopButton extends React.Component {
  constructor() {
    super();
    this.state = { "started": false };
  }

  render() {
    const text = this.state.started ? this.props.startedText : this.props.stoppedText;
    return (
      <button className={"btn " + this.state.started ? "btn-danger" : "btn-success"} onClick={() => this.handleClick()}>
        {text}
      </button>
    )
  }

  handleClick() {
    const started = this.state.started;
    this.props.onChangeState(!started);
    this.setState(Object.assign(this.state, { "started": !started }));
  }
}

StartStopButton.propTypes = {
  onChangeState: PropTypes.func,
  stoppedText: PropTypes.string,
  startedText: PropTypes.string
};
