import React from 'react';
import stylesheet from './TopControlRow.css'
import PropTypes from 'prop-types';
import StartStopButton from './StartStopButton'
import ConfirmedField from "./ConfirmedField";

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
        <ConfirmedField onInput={text => this.handleFilterChange(text)}
                        buttonText={"Filter"}
                        inputFieldWidth={"200px"} />
        <ConfirmedField onInput={text => this.handleDisplayCountChange(text)}
                        buttonText={"Confirm"}
                        inputFieldWidth={"100px"} />
        <StartStopButton stoppedText={"Start"}
                         startedText={"Stop"}
                         onChangeState={started => this.handleCaptureToggle(started)}/>

        <button onClick={() => this.handleExportClick()} className={"btn btn-default"} style={{ marginLeft: "8px" }}>Export</button>
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

  handleDisplayCountChange(text) {
    const value = parseInt(text);

    this.props.onDisplayCountChanged(value);
    this.setState(Object.assign(this.state, { displayCount: value }));
  }

  handleExportClick() {
    this.props.onExportClick();
  }
}

TopControlRow.propTypes = {
  onCaptureStarted: PropTypes.func,
  onFilterChanged: PropTypes.func,
  onDisplayCountChanged: PropTypes.func,
  onExportClick: PropTypes.func
};
