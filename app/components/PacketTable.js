import React from 'react';
import stylesheet from './PacketTable.css'
import { mapColor } from '../utils/proto-color-mapping'
import PropTypes from 'prop-types';

export default class PacketTable extends React.Component {
  componentDidUpdate() {
    if (this.props.enableAutoscroll)
      this.tableEnd.scrollIntoView({ behavior: "smooth" })
  }

  renderHeader() {
    return (
      <thead className={stylesheet.fixedHeader}>
      <tr>
        <th className={stylesheet.lengthCol}>Length</th>
        <th className={stylesheet.protoCol}>Protocol</th>
        <th className={stylesheet.ipCol}>Source IP</th>
        <th className={stylesheet.ipCol}>Target IP</th>
        <th className={stylesheet.descriptionCol}>Description</th>
        {/* scrollbar padding */}
        <td style={{ width: "5px" }}/>
      </tr>
      </thead>
    )
  }

  renderFiller() {
    return (<tr className={stylesheet.filler}>
      <td className={stylesheet.lengthCol}>e</td>
      <td className={stylesheet.protoCol}>e</td>
      <td className={stylesheet.ipCol}>e</td>
      <td className={stylesheet.ipCol}>e</td>
      <td className={stylesheet.descriptionCol}>e</td>
    </tr>);
  }

  render() {
    const packetData = this.props.packetData || [];

    return (
      <div className={stylesheet.tableContainer}>
        <table>
          {this.renderHeader()}
          <tbody>
          {this.renderFiller()}
          {packetData.map((x, idx) => (
            <tr onClick={(e) => this.processClick(e, { x })} key={idx} style={{ background: mapColor(x.getProtocol()) }}>
              <td className={stylesheet.lengthCol}>{x.getLength()}</td>
              <td className={stylesheet.protoCol}>{x.getProtocol()}</td>
              <td className={stylesheet.ipCol}>{x.sourceIP}</td>
              <td className={stylesheet.ipCol}>{x.targetIP}</td>
              <td className={stylesheet.descriptionCol}>{x.descriptionText}</td>
            </tr>
          ))}
          <div style={{ float: "left", clear: "both" }} ref={(el) => { this.tableEnd = el; }} />
          </tbody>
        </table>
        </div>
    );
  }

  processClick(e, x) {
    this.props.displayDetails(e, x.x);
  }
}

PacketTable.propTypes = {
  displayDetails: PropTypes.func,
  packetData: PropTypes.arrayOf(PropTypes.object),
  enableAutoscroll: PropTypes.bool
};
