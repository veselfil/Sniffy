import React from 'react';
import PropTypes from 'prop-types';
import {splitStringToSegments} from "../utils/packet-content-formatting";
import stylesheet from './HexView.css'

export default class HexView extends React.Component {
  SEGMENT_LENGTH = 24;

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.displayTextView !== nextProps.displayTextView
      || this.props.hexString !== nextProps.hexString;
  }

  render() {
    const lines = splitStringToSegments(this.props.hexString, this.SEGMENT_LENGTH * 2);
    const segments = lines.map(x => splitStringToSegments(x, 2));

    return (
      <div className={stylesheet.tableContainer}>
        <table>
          <thead>
          <tr>
            {Array.from({length: this.SEGMENT_LENGTH}, (x, i) => i).map(x => <td>{x}</td>)}
          </tr>
          </thead>
          <tbody>
          {segments.map((line, index) => (
            <tr key={index}>
              {line.map((x, idx) => <td key={idx}>{x}</td>)}
            </tr>
          ))}
          <tr>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

HexView.propTypes = {
  hexString: PropTypes.string,
  displayTextView: PropTypes.bool
};
