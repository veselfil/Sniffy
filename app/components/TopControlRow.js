import React from 'react';
import stylesheet from './TopControlRow.css'
import PropTypes from 'prop-types';
import StartStopButton from './StartStopButton'
import FilterField from "./FilterField";

export default class TopControlRow extends React.Component {
  constructor() {
    super();
    this.state = {
      displayCount: 100,
      filterText: "",
      captureRunning: false
    };
  }

  render() {
    return (
      <div className={stylesheet.controlRow}>
        <FilterField onInput={text => this.handleFilterChange(text)} />
        <input type={"text"} onChange={(event) => this.handleDisplayCountChange(event)} value={this.state.displayCount}
               className={"form-control " + stylesheet.textField}/>
        <StartStopButton stoppedText={"Start"} startedText={"Stop"}
                         onChangeState={started => this.handleCaptureToggle(started)}/>
      </div>
    );
  }

  handleCaptureToggle(started) {
    this.props.onCaptureStarted(started);
    this.setState(Object.assign(this.state, { captureRunning: started }));
  }

  handleFilterChange(text) {
    this.props.onFilterChanged(text);
    this.setState(Object.assign(this.state, { filterText: text }));
  }

  handleDisplayCountChange(event) {
    const value = parseInt(event.target.value.toString());

    this.props.onDisplayCountChanged(value);
    this.setState(Object.assign(this.state, { displayCount: value }));
  }
}

TopControlRow.propTypes = {
  onCaptureStarted: PropTypes.func,
  onFilterChanged: PropTypes.func,
  onDisplayCountChanged: PropTypes.func
};
