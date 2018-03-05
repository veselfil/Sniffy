import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './FilterField.css';

export default class FilterField extends React.Component {
  constructor() {
    super();
    this.state = { filterText: " " };
  }

  render() {
    return (
      <span className={stylesheet.filterConatainer}>
        <input type={"text"}
               className={"form-control " + stylesheet.textField}
               onChange={(event) => this.handleTextChange(event)}
               value={this.state.filterText} />
        <button onClick={() => this.handleFilterClick()} className={"btn btn-primary " + stylesheet.filterButton}>Filter</button>
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

FilterField.propTypes = {
  onInput: PropTypes.func
};
