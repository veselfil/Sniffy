import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './ConfirmedField.css';

export default class ConfirmedField extends React.Component {
  constructor() {
    super();
    this.state = { filterText: " " };
  }

  render() {
    let inputWidth = this.props.inputFieldWidth;
    if (typeof inputWidth === "undefined")
      inputWidth = "150px";

    return (
      <span className={stylesheet.filterConatainer}>
        <input type={"text"}
               className={"form-control " + stylesheet.textField}
               onChange={(event) => this.handleTextChange(event)}
               value={this.state.filterText}
               style={{ width: inputWidth }}/>
        <button onClick={() => this.handleFilterClick()}
                className={"btn btn-primary " + stylesheet.filterButton}>{this.props.buttonText}</button>
      </span>
    );
  }

  handleFilterClick() {
    this.props.onInput(this.state.filterText);
  }

  handleTextChange(event) {
    const value = event.target.value.toString();
    this.setState(Object.assign(this.state, { filterText: value }));
  }
}

ConfirmedField.propTypes = {
  onInput: PropTypes.func,
  buttonText: PropTypes.string,
  inputFieldWidth: PropTypes.string
};
